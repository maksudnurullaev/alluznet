var win, lid;

function show_login()
{
    
    var login = new Ext.FormPanel({
		labelWidth: 75,
		autoHeight: true,
		url: 'data.rb',
		frame: true,
		border: false,
		defaultType: 'textfield',
		items: [{
			fieldLabel: 'Login',
			width: 180,
			id: 'login-text',
			name: 'userlogin',
			allowBlank: false,
		},{
			fieldLabel: 'Password',
			name: 'userpass',
			id: 'login-pass',
			width: 180,
			inputType: 'Password',
			allowBlank: false
		}],

		buttons: [{
			text: 'Login',
			
			listeners:{
				'click': function (n){
					lid = Ext.getCmp('login-text').getValue();
				    alert ("Salom "+lid);
				}
			}
			
		},{
			text: 'Close',
			listeners:{
				'click': function (n){
					win.close();
				}
			}

		}],
//		renderTo: 'login'
	});
    win = new Ext.Window({
                xtype: 'Form',
                width: 288,
                height: 124,
                collapsible: true,
                draggable: true,
                modal: true,
                onEsc: function(){win.close()},
                resizable: false,
                shadow: true,
                shadowOffset: 7,
                title: 'Login window',
                items: [login],
     });
    win.show();
}
