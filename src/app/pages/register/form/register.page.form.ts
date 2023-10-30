import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { findAddressNumber, findCity, findState, findStreet, findZipCode } from "src/app/utils/address-utils";

export class RegisterPageForm {
    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(
        formBuilder: FormBuilder
    )
    {
        this.formBuilder = formBuilder;
        this.form = this.createForm();

    }
    private createForm() : FormGroup{
        let form = this.formBuilder.group({

            name: ['', [Validators.required]],
            email: ['',[Validators.required, Validators.email]],
            password: ['',[Validators.required, Validators.minLength(6)]],
            repeatPassword: ['',[Validators.required]],
            phone: ['',[Validators.required]],
            address: this.formBuilder.group({
                street: ['',[Validators.required]],
                number: ['',[Validators.required]],
                zipCode: ['',[Validators.required]],
                state: ['',[Validators.required]],
                city: ['', [Validators.required]],
        })
     })
        form.get('repeatPassword')?.setValidators(matchRepeatPassword(form))
            return form;
        }
    getForm() : FormGroup {
        return this.form;
    }
     setAddress(place : any){
        const addressForm = this.form.get('address');
        addressForm?.get('street')?.setValue(findStreet(place.address_components));
        addressForm?.get('number')?.setValue(findAddressNumber(place.address_components));
        addressForm?.get('zipCode')?.setValue(findZipCode(place.address_components));
        addressForm?.get('state')?.setValue(findState(place.address_components));
        addressForm?.get('city')?.setValue(findCity(place.address_components));


     }
    
}
   function matchRepeatPassword(form: FormGroup) {
        const password = form.get('password');
        const repeatPassword = form.get('repeatPassword')
        const validator = () => {
            return password?.value == repeatPassword?.value ? null : {isMatching: true}
        } 
        return validator;

    }


