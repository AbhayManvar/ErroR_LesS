var OperatorPriority = []; 
OperatorPriority["+"] = "0";
OperatorPriority["-"] = "0";
OperatorPriority["x"] = "1";
OperatorPriority["/"] = "1"; 
OperatorPriority["^"] = "2";


var postExp = [];
var operatorStack = [];

//Start
$(function(){

    
    var Expression = [];

    //when digit pressed
    $(".digit").click(function (e) { 
        if( isNaN( Expression[Expression.length-1] ) || Expression.length == 0){
            Expression.push(this.id);
        } 
        else{
            Expression[Expression.length-1] += this.id;
        }
        if(Expression[Expression.length-1][0] == "."){
            Expression[Expression.length-1] = "0" + Expression[Expression.length-1];
        }
        
        $("#viewOperations").html(Expression.join(""));
    });



    //when operator pressed
    $(".op").click(function (e){

        if(this.id == "clear"){
            Expression = [];
            postExp = [];
            operatorStack = [];
            $("#viewResult").html("&nbsp;");
            $("#viewOperations").html("&nbsp");
        }

        else if(this.id == "<"){
            var str = Expression[Expression.length-1].toString();
            if(!isNaN(str)){
                str = str.substring(0, str.length-1);
                Expression[Expression.length-1] = str;
            }
            else{
                Expression.pop();
            }
            $("#viewOperations").html(Expression.join(""));
        }

        else if(this.id == "result"){
             if(Expression.length >= 3){
                if(Expression[Expression.length-1] == "+" || Expression[Expression.length-1] == "-" 
                || Expression[Expression.length-1] == "/" || Expression[Expression.length-1] == "x" 
                || Expression[Expression.length-1] == "^"){
                    Expression.pop();
                    $("#viewOperations").html(Expression.join(""));
                }else{
                    Expression[Expression.length-1] = Number(Expression[Expression.length-1]);
                }
                Calculate(Expression);
                $("#viewResult").html(postExp);
                Expression = [];
                Expression.push(postExp[0]);
                postExp = [];
             }
        }

        else{
            if(Expression.length != 0 && Expression[Expression.length-1] != "+"
            && Expression[Expression.length-1] != "-" && Expression[Expression.length-1] != "/"
            && Expression[Expression.length-1] != "x" && Expression[Expression.length-1] != "^"){
                Expression[Expression.length-1] = Number(Expression[Expression.length-1]);
                Expression.push(this.id);
                $("#viewOperations").html(Expression.join(""));
            }
            
        }

    });
});



function Calculate(s){

//infix TO postfix conversion    
    s.forEach(element => {
        if(isNaN(element)){
            placeOperator(element);
        }
        else{
            postExp.push(element);
        }
    });
   
    while( operatorStack.length != 0){
        postExp.push( operatorStack.pop() );
    }


//postfix calculation
    while( postExp.length != 1){
        for(i=0; i<=postExp.length; i++){
            if(isNaN(postExp[i])){
                switch(postExp[i]){
                     case "+":
                         postExp.splice(i-2, 3, postExp[i-2] + postExp[i-1]);
                         break;
                     case "-":
                         postExp.splice(i-2, 3, postExp[i-2] - postExp[i-1]);
                         break;
                     case "x":
                         postExp.splice(i-2, 3, postExp[i-2] * postExp[i-1]);
                         break;
                     case "/":
                         postExp.splice(i-2, 3, postExp[i-2] / postExp[i-1]);
                         break;
                     case "^":
                         postExp.splice(i-2, 3, Math.pow(postExp[i-2], postExp[i-1]));
                         break;
                     default:
                         alert("Please enter appropriate value.");
                }
                break;
            } 
        }
    }


}



function placeOperator(op){

    if( operatorStack.length == 0 ){
        operatorStack.push( op );
    }
    else{
        if( OperatorPriority[ operatorStack[operatorStack.length - 1 ] ] <
            OperatorPriority[ op ] ){
                operatorStack.push( op );
        }
        else{
            postExp.push(operatorStack.pop());
            placeOperator( op );
        }
    }

}








