
var win, lid;
var loadFn = function(btn, statusBar, o,n){
        btn = Ext.getCmp(btn);
        statusBar = Ext.getCmp(statusBar);
        btn.disable();
        statusBar.showBusy();
		var stat='';
		Ext.Ajax.request({
        url: '/main/update_pass',
        method: 'GET',
        isLoading: true,
		params: {op: o, np: n},
		callback: function (t1, t2, t3){
            stat=t3.responseText;
			}
		}); 
        (function(){
			statusBar.setStatus({
				text: stat,
				iconCls: 'ok-icon',
				clear: false
			});
			btn.enable();
        }).defer(2000);
    };

Ext.apply(Ext.form.VTypes, {
     password : function(val, field) {
        if (field.initialPassField) {
            var pwd = Ext.getCmp(field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
    },
    passwordText : 'Passwords do not match'
});
function VerUser()
{
	em = Ext.getCmp('email').getValue();
	Ext.Ajax.request({
        url: '/main/verUser',
        method: 'GET',
        isLoading: true,
        params: {email: em},
        callback: function (t1, t2, t3){
            
            //alert(cmp.getStyle("background"));
            //Ext.Msg.alert ("Message", t3.responseText);
            		/*Ext.form.Field.prototype.msgTarget = 'side';
			Ext.form.Field.prototype.errorEl = Ext.get('email');*/
        }
    });
}


var captchap;
function show_Registration()
{
	var Regis = new Ext.FormPanel({
		labelWidth: 180,
		autoHeight: true,
		url: '/main/register',
		id: 'reg',
		frame: true,
		waitMsgTarget: true,
		
		msgSubmitWait: Language.registration, 
		border: false,
        defaultType: 'textfield',
		items: [
                    {
						fieldLabel: 'Email',
						name: 'email',
						id: 'email',
						vtype:'email',
						blankText: 'Вы должны ввести действительный адрес электронной почты',//You must enter a valid email account>
						emptyText: 'name@domain.com',
						vtypeText: 'Пожалуйста, введите действительный адрес электронной почты: name@domain.com',//Please enter a valid email address
						tooltip:{
							tip:'Введите адрес <b>электронной почты</b>: name@domain.com',//Enter a valid <b>email address</b>
							width: 170
						},
						allowBlank: false,
						width: 180,
						items: [{
							xtype: 'label',
							html: 'ura'
						}]
					},{
						fieldLabel: Language.password,
                        width: 180,
                        inputType: 'password',
						listeners:{
							'focus': VerUser
						},
                        allowBlank: false,
						blankText: 'Вы должны ввести пароль',//You must enter a password
						minLengthText: "Минимум 6 символов",
						minLength: 6,
						tooltip:{
							tip:'Введите Ваша <b>Пароль</b>',//Enter your <b>Password</b>
							width: 150
						},
                        id: 'login_pass',
                        name: 'login_pass'
					},{
                        fieldLabel: Language.conf_pass,
                        name: 'pass_cfrm',
                        inputType: 'password',
                        vtype: 'password',
                        initialPassField: 'login_pass', 
                        width: 180
					},{
                        xtype: 'checkbox',
						fieldLabel: 'Познакомилься с <a href="salom"> условиями </a>',
						boxLabel: 'Согласно',
						id: 'chbxreg',
						listeners: {'check': function()
						{
							Ext.getCmp('regbtn').setDisabled(!Ext.getCmp('chbxreg').getValue());
						}}
                        
					},{
		                fieldLabel: Language.human,
		                name: 'human',
		                xtype: 'captcha'
		            }],
		buttons: [{
			text: Language.registration,
			id: 'regbtn',
			width: 180,  
			disabled: true,
			handler: function() {
			  Ext.getCmp('regbtn').setDisabled(true);
			  Ext.getCmp('clsbtn').setDisabled(true);
			  em = Ext.getCmp('email').getValue();
			  ps = Ext.getCmp('login_pass').getValue();
			  Regis.getForm().submit(
			  {
				waitMsg: Language.registration,
				method: 'GET',
				maskDisabled: true,
				reset : false,
				success : function(t1, t2){
					Ext.Msg.alert('Success',t2.result.text);
					win.close();
				},
				failure: function(form,qaytdi){
					Ext.getCmp('regbtn').setDisabled(false);
					Ext.Msg.alert('Error',qaytdi.result.text);
					}
			  });
			}

	  },{
		width: 180,  
		text: Language.close,
		id: 'clsbtn',
		listeners:{
			'click': function (n){
				win.close();
			}
		}
		}]
    });
        
        win = new Ext.Window({
                xtype: 'Form',
				width: 430,
                height: 210,
                action: 'main/login',
                collapsible: true,
                draggable: true,
                modal: true,
                onEsc: function(){win.close()},
                resizable: false,
                shadow: true,
                shadowOffset: 7,
                title: Language.reg_form,
                items: [Regis]
     });
    win.show();
}
