var win, lid;

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

function show_Registration()
{
    var Regis = new Ext.FormPanel({
		labelWidth: 180,
		autoHeight: true,
		url: 'data.rb',
		frame: true,
		border: false,
                defaultType: 'textfield',
		items: [{
			fieldLabel: 'Login',
			width: 180,
			id: 'login_text',
			name: 'userlogin',
			allowBlank: false
		},{
                        fieldLabel: 'Password',
                        width: 180,
                        inputType: 'password',
                        allowBlank: false,
                        id: 'login_pass',
                        name: 'login_pass'
                  },{
                        fieldLabel: 'Confirm Password',
                        name: 'pass_cfrm',
                        inputType: 'password',
                        vtype: 'password',
                        initialPassField: 'login_pass', // id of the initial password field
                        width: 180
                  },{
                      fieldLabel: 'First Name',
                      name: 'first',
                      id: 'firstname',
                      allowBlank:false,
                      width: 180
                  },{
                      fieldLabel: 'Last Name',
                      name: 'last',
                      id: 'lastname',
                      width: 180
                },{
                      fieldLabel: 'Company',
                      name: 'company',
                      id: 'company',
                      width: 180
                },{
                      fieldLabel: 'Email',
                      name: 'email',
                      id: 'email',
                      vtype:'email',
                      width: 180
                }],

		buttons: [{
			text: 'Registration',
                        width: 180,  
                        listeners:{
				'click': function (n){
					lid = Ext.getCmp('login_text').getValue();
				    alert ("Salom "+lid);
				}
			}
			
                  },{
                      width: 180,  
			text: 'Cancel',
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
                height: 260,
                action: 'main/login',
                collapsible: true,
                draggable: true,
                modal: true,
                onEsc: function(){win.close()},
                resizable: false,
                shadow: true,
                shadowOffset: 7,
                title: 'Registration form',
                items: [Regis]
     });
    win.show();
}
