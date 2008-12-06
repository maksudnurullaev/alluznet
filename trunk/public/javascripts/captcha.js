Ext.ns('Ext.ux.form'); 
var mesEn="Enter the <b>number</b> which satisfies the equation: <br/>";
var mesRu="Введите <b>число</b>, которое удовлетворяет уравнению:<br/>";
Ext.ux.form.BotField = Ext.extend(Ext.form.NumberField,  {
    allowNegative : true,
    answerText : "?",
    answerLocation : "either",
    answerOperators : ["+","-","*"],
    errorText : mesRu,
    hideQuestion: true,
    messageText : 'To verify you are not a robot, please enter the <b>number</b> that satisfies this equation:<br />',
    showQuestion : true,
    selectOnFocus : true,
	onRender : function(){
        this.setBotValue();
        if(!this.qtip){
            this.qtip = {};
        }
        if (this.qtip) {
            this.qtip.text = this.qtip.text || this.messageText + '<b>' + this.botMessage + '</b>';
            this.qtip.width = this.qtip.width || 220;
        }
        if (this.showQuestion) {
            this.emptyText = this.botMessage; 
        }
        Ext.ux.form.BotField.superclass.onRender.apply(this, arguments);
    }, 
	initEvents : function(){
        Ext.apply(this, {
			allowDecimals : false,
            allowBlank: false
        });
       Ext.ux.form.BotField.superclass.initEvents.apply(this, arguments);
        this.validator = this.validateBotValue;
    }, 
    validateBotValue : function(v){
        if (v != this.botAnswer){
            return this.errorText + this.botValMessage;
        }
        return true;
    }, 
    setBotValue : function(){
        var a = Math.ceil(Math.random() * 10);
        var b = Math.ceil(Math.random() * 10);       
        var max = this.answerOperators.length - 1;
        var min = 0;
        var i = Math.floor((max-(min-1))*Math.random()) + min;
        var operator = this.answerOperators[i];
        if ((operator == '-') && !this.allowNegative){
            var hi = Math.max(a,b);
            b = Math.min(a,b);
            a = hi;                        
        }
        var equation = a + operator + b;
        this.botAnswer = eval(equation);
        if (this.answerLocation == 'either') {
            this.answerLocation = (a < b) ? 'before' : 'after';
        }        
        var beforeEqual, afterEqual;
        if (this.answerLocation == 'after') {
            beforeEqual = b;
            afterEqual = this.answerText;
        }        
        else {
            beforeEqual = this.answerText;
            afterEqual = this.botAnswer;
            this.botAnswer = b;
        }        
        this.botMessage = String.format('{0} {1} {2} = {3}', a, operator, beforeEqual, afterEqual);
        this.botValMessage = '<b>'+this.botMessage+'</b>';
    } 
});
Ext.reg('captcha', Ext.ux.form.BotField);