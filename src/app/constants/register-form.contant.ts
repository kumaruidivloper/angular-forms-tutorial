import { IForm } from "../interface/form.interface";

export const registerFormConfig: IForm = {
    formTitle: 'Registration Form',
    saveBtnTitle: 'Register',
    resetBtnTitle: 'Reset',
    formControls: [
        {
            "name": "firstName",
            "label": "First Name",
            "value": "",
            "placeholder": "",
            "class": "col-md-6",
            "type": "text",
            "validators": [
                {
                    "validatorName": "required",
                    "required": true,
                    "message": "* Firstname is required"
                }
            ]
        },

        {
            "name": "lastName",
            "label": "Last Name",
            "value": "",
            "placeholder": "",
            "class": "col-md-6",
            "type": "text",
            "validators": [
                {
                    "validatorName": "required",
                    "required": true,
                    "message": "* LastName is required"
                },
                {
                    "validatorName": "minLength",
                    "minLength": 5,
                    "required": true,
                    "message": "* Minimum char should be 5"
                }
            ]
        },

        {
            "name": "email",
            "label": "Email",
            "value": "",
            "placeholder": "",
            "class": "col-md-4",
            "type": "email",
            "validators": [
                {
                    "validatorName": "required",
                    "required": true,
                    "message": "* Email is Required"
                },
                {
                    "validatorName": "email",
                    "email": "email",
                    "required": true,
                    "message": "** Email is Not valid"
                }
            ]
        },

        {
            "name": "mobile",
            "label": "Mobile",
            "placeholder": "",
            "class": "col-md-4",
            "type": "number",
            "validators": [
                {
                    "validatorName": "required",
                    "required": true,
                    "message": "Mobile Number is Required"
                },
                {
                    "validatorName": "maxlength",
                    "maxLength": 10,
                    "required": true,
                    "message": "Maximum 10 digit is allowed"
                }
            ]
        },

        {
            "name": "weight",
            "label": "Weight",
            "placeholder": "Should be in Kgs",
            "class": "col-md-4",
            "type": "number",
            "validators": [
                {
                    "validatorName": "required",
                    "required": true,
                    "message": "* Weight is Required"
                },
                {
                    "validatorName": "maxlength",
                    "maxLength": 10,
                    "required": true,
                    "message": "* Height is Requiered"
                }
            ]
        },

        {
            "name": "height",
            "label": "Height",
            "placeholder": "Should be in cm",
            "class": "col-md-4",
            "type": "number",
            "validators": [
                {
                    "validatorName": "required",
                    "required": true,
                    "message": "*Height is Required"
                },
                {
                    "validatorName": "maxlength",
                    "maxLength": 10,
                    "required": true,
                    "message": "Height is Requiered"
                }
            ]
        },

        {
            "name": "gender",
            "label": "Gender",
            "placeholder": "",
            "class": "col-md-4",
            "radioOptions": [
                "Male",
                "Female"
            ],
            "type": "radio",
            "validators": [
                {
                    "validatorName": "required",
                    "required": true,
                    "message": "Gender is Required"
                },
                {
                    "validatorName": "maxlength",
                    "maxLength": 10,
                    "required": true,
                    "message": "Height is Requiered"
                }
            ]
        },

        {
            "name": "trainer",
            "label": "Require Trainer",
            "placeholder": "",
            "class": "col-md-4",
            "radioOptions": [
                "Yes",
                "No"
            ],
            "type": "radio",
            "validators": [
                {
                    "validatorName": "required",
                    "required": true,
                    "message": "Selection is Required"
                }
            ]
        },

         {
            "name": "package",
            "label": "Package",
            "placeholder": "",
            "class": "col-md-4",
            "options": [
                {
                    "id": 1,
                    "value": "Monthly"
                },
                {
                    "id": 2,
                    "value": "Quarterly"
                },
                {
                    "id": 3,
                    "value": "Yearly"
                }
            ],
            "type": "select",
            "validators": [
                {
                    "validatorName": "required",
                    "required": true,
                    "message": "Package is Required"
                }
            ]
        },

        {
            "name": "motivation",
            "label": "What is important to you?",
            "placeholder": "",
            "class": "col-md-4",
            "options": [
                {
                    "id": 1,
                    "value": "Get Fit"
                },
                {
                    "id": 2,
                    "value": "Gain more Muscle"
                },
                {
                    "id": 3,
                    "value": "Weight Loss"
                }
            ],
            "type": "select",
            "validators": [
                {
                    "validatorName": "required",
                    "required": true,
                    "message": "Selection is Required"
                 }
            ]
        },

        {
            "name": "enquiryDate",
            "label": "Date of Enquiry",
            "placeholder": "",
            "class": "col-md-4",
            "type": "date",
            "validators": [
                {
                    "validatorName": "required",
                    "required": true,
                    "message": "* Enquiry Date is Required"
                 }
            ]
        },
    ]
}