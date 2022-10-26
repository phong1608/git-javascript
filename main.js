
function validator(option)
{
    //hàm validate (kiểm tra các lỗi được nhập vào ô input)
    validate=(inputElement,rule)=>{
        //khai báo biến errorElement 
        let errorElement=inputElement.parentElement.querySelector('.form-message') 
        let errorMessage;
        let rules=selectorrules[rule.selector]
            for(let i=0;i<rules.length;i++)
            {
                errorMessage=rules[i](inputElement.value)
                if(errorMessage) break
            }
        if(errorMessage)
                    {
                        errorElement.innerText=errorMessage;
                        inputElement.parentElement.classList.add('invalid')
                    }
                    else{
                        errorElement.innerText='';
                        inputElement.parentElement.classList.remove('invalid')
                    }
                    //Xử lý khi người dùng nhập
                    inputElement.oninput=(value)=>
                    {
                        errorElement.innerText=''
                        inputElement.parentElement.classList.remove('invalid')
                    }  
                    return !errorMessage;
            
    }
    let formElement=document.querySelector(option.form)
    let selectorrules={};
    
    if(formElement){
        formElement.onsubmit=(e)=>{
            e.preventDefault()
            let isValidform=true;
            option.rules.forEach((rule)=>{
                let inputElement=formElement.querySelector(rule.selector)
                let isValid=validate(inputElement,rule)
                if(!isValid)
                {
                    isValidform=false;
                }
                
            })
            if(isValidform)
            {
                console.log('No error')
            }
            else{
                console.log('error found')
            }
            
        }
    
        option.rules.forEach((rule)=>{
            
            if(Array.isArray(selectorrules[rule.selector]))
                   {
                    selectorrules[rule.selector].push(rule.test);
                   }
                   else{
                    selectorrules[rule.selector]=[rule.test]
                   }

            
            //lưu lại các rules trong input
           
            let inputElement=formElement.querySelector(rule.selector)
           
            
            if(inputElement)
            {
                inputElement.onblur=function()
                {
                   
                   validate(inputElement,rule)
                    
                              
                }
            }
            
        });
     
    }
    
  console.log(selectorrules)
}
validator.isRequired=(e)=>{
    return{
        selector: e,
        test: function(value){
            return value.trim() ? undefined :'Vui lòng nhập lại'
        }
    }
}
validator.isEmail=(e)=>{
    return{
        selector: e,
        test: function(value){
            let regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ?undefined:'Vui lòng nhập lại email'

        }
    }
}
validator.minlength=(e,length)=>{
    return{
        selector: e,
        test: function(value){
            return value.length>length?undefined:'Vui lòng nhập đủ số ký tự'

        }
    }
}
validator.confirm=(e,confirmvalue)=>{
    return{
        selector:e,
        test:function(value){
            return value===confirmvalue()?undefined:'Giá trị không chính xác'
        }
    }
}
validator.onSubmit=()=>{

}
