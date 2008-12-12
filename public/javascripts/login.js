var win, lid;


function addAnnounce()
{
	var store = new Ext.data.SimpleStore({
        fields: ['abbr', 'state'],
		data : Language.types
    });
	/*
	var ds = new Ext.data.Store({
	proxy: new Ext.data.ScriptTagProxy({
		url: '/main/'
	}),
	reader: new Ext.data.JsonReader({
		root: 'topics',
		totalProperty: 'totalCount',
		id: 'post_id'
	}, [
		{name: 'title', mapping: 'topic_title'},
		{name: 'topicId', mapping: 'topic_id'},
		{name: 'author', mapping: 'author'},
		{name: 'lastPost', mapping: 'post_time', type: 'date', dateFormat: 'timestamp'},
		{name: 'excerpt', mapping: 'post_text'}
	])
    });
	*/
	var Announce = new Ext.FormPanel({
		labelWidth: 110,
		autoHeight: true,
        id: 'forgot',
		url: '/main/addAnnounce',
		frame: true,
		border: false,
		defaultType: 'combo',
		items: [{
			fieldLabel: Language.type,
			width: 250,
			store: store,
			displayField:'state',
			mode: 'local',
			typeAhead: true,
	        triggerAction: 'all',
	        forceSelection:true,
			allowBlank:false,
			blankText: 'Введите'
		},{
			fieldLabel: Language.category,
			allowBlank: false,
			width: 250
		},{
			fieldLabel: Language.place,
			allowBlank: false,
			width: 250
		},{
			fieldLabel: Language.ann_title,
			allowBlank: false,
			width: 250,
			xtype: 'textfield'
		},{
			fieldLabel: Language.text,
			allowBlank: false,
			width: 340,
			height: 160,
			xtype: 'textarea',
			listeners:{
				'keypress': function (n){
					
				}
			}
		},{
			fieldLabel: Language.price,
			width: 100,
			xtype: 'textfield'
		},{
			fieldLabel: Language.cur,
			store: new Ext.data.SimpleStore({
				fields: ['abbr', 'value'],
				data: [['dollar','$'],['euro','\u20ac'],['sum','Сум']]
			}),
			mode: 'local',
			displayField:'value',
			width: 100,
			triggerAction: 'all',
			typeAhead: true,
	        
	        forceSelection:true,
			//allowBlank:false,
			//blankText: 'Введите'
		},{
			xtype: 'textfield',
			fieldLabel: 'Telephone',
			allowBlank: false,
			width: 150,
			regex: '^((\+){0,1}91(\s){0,1}(\-){0,1}(\s){0,1}){0,1}98(\s){0,1}(\-){0,1}(\s){0,1}[1-9]{1}[0-9]{7}$',
			maskRe:'^((\+){0,1}91(\s){0,1}(\-){0,1}(\s){0,1}){0,1}98(\s){0,1}(\-){0,1}(\s){0,1}[1-9]{1}[0-9]{7}$',
			regexText: 'false',
			
		}],
		buttons: [/*{
			text: Language.get,
			handler: function() {
                          
			},{
			text: Language.close,
			listeners:{
				'click': function (n){
					win.close();
				}
			}
		}*/]
	});
    win = new Ext.Window({
                xtype: 'Form',
                width: 500,
                height: 500,
                collapsible: true,
                draggable: true,
                modal: true,
                onEsc: function(){win.close()},
                resizable: false,
                shadow: true,
                shadowOffset: 7,
                title: Language.addAnnounce,
                items: [Announce]
     });
    win.show();
}

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
								location.assign(t2.result.put);
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
