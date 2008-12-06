var win, lid;

function forgot_password()
{
	var forgot = new Ext.FormPanel({
		labelWidth: 75,
		autoHeight: true,
        id: 'forgot',
		url: '/main/forgot',
		frame: true,
		border: false,
		defaultType: 'textfield',
		items: [{
			fieldLabel: 'Email',
			width: 180,
			id: 'email-text',
			name: 'email',
			vtype: 'email',
			allowBlank: false
		}],
		buttons: [{
			text: Language.get,
			handler: function() {
                          //em = Ext.getCmp('email-text').getValue();
                          forgot.getForm().submit(
                          {
                            method: 'GET',
                            reset : true,
                            success : function(t1, t2){
                                Ext.Msg.alert('Info',t2.result.text);
                                win.close();
                                location.assign('/main');
                                
                            },
                            failure: function(form,qaytdi){
                                Ext.Msg.alert('Error',qaytdi.result.text);
                                }
                          });
                        }
			},{
			text: Language.close,
			listeners:{
				'click': function (n){
					win.close();
				}
			}
		}]
	});
    win = new Ext.Window({
                xtype: 'Form',
                width: 310,
                height: 108,
                collapsible: true,
                draggable: true,
                modal: true,
                onEsc: function(){win.close()},
                resizable: false,
                shadow: true,
                shadowOffset: 7,
                title: Language.rec_pass,
                items: [forgot],
     });
    win.show();
}



function show_login()
{
	var login = new Ext.FormPanel({
		labelWidth: 75,
		autoHeight: true,
        id: 'user',
		url: '/main/login',//login
		frame: true,
		border: false,
		defaultType: 'textfield',
		items: [{
		
			fieldLabel: 'Email',
			name: 'userlogin',
			id: 'email',
			vtype:'email',
			blankText: Language.must_email,
			emptyText: 'name@domain.com',
			vtypeText: Language.must_email,
			tooltip:{
				tip: Language.must_email,
				width: 170
			},
			allowBlank: false,
			width: 180
		},{
			fieldLabel: Language.password,
			name: 'userpass',
			id: 'login-pass',
			width: 180,
			inputType: 'password',
			listeners:{
				'focus': VerUser
			},
			allowBlank: false,
			blankText: Language.must_pass,
			minLength: 6,
			minLengthText: Language.min_pass,
			tooltip:{
				tip: Language.enter_pass,
				width: 150
			}
		}],
		buttons: [{
			text: Language.login,
			handler: function() {
						
                          login.getForm().submit(
                          {
                            method: 'GET',
                            reset : true,
                            success : function(t1, t2){
                                win.close();
                                location.assign('/main');
                                
                            },
                            failure: function(form,qaytdi){
                                Ext.Msg.alert('Error',qaytdi.result.text);
                                }
                          });
                        }
			},{
			text: Language.close,
			listeners:{
				'click': function (n){
					win.close();
				}
			}
		}]
	});
    win = new Ext.Window({
                xtype: 'Form',
                width: 310,
                height: 130,
                collapsible: true,
                draggable: true,
                modal: true,
                onEsc: function(){win.close()},
                resizable: false,
                shadow: true,
                shadowOffset: 7,
                title: Language.log_sys,
                items: [login],
     });
    win.show();
}
