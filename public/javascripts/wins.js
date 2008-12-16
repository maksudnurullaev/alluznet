function ShowWindow(witem, wtitle, wwidth, wheight)
{
	win = new Ext.Window({
                xtype: 'Form',
                width: wwidth,
                height: wheight,
                collapsible: true,
                draggable: true,
                modal: true,
                onEsc: function(){win.close()},
                resizable: false,
                shadow: true,
                shadowOffset: 7,
                title: wtitle,
                items: [witem]
     });
    win.show();
}
function addAnnounce()
{
	var Announce = new Ext.FormPanel({
		labelWidth: 70,
		autoHeight: true,
        id: 'forgot',
		url: '/main/addAnnounce',
		frame: true,
		border: false,
		items: [{
			fieldLabel: Language.type,
			name: 'type',
			xtype: 'combo',
			width: 250,
			store: new Ext.data.SimpleStore({
				fields: ['abbr', 'state'],
				data : Language.types
			}),
			displayField:'state',
			mode: 'local',
			typeAhead: true,
	        triggerAction: 'all',
	        forceSelection:true,
			allowBlank:false,
			editable: false
		},{
			fieldLabel: Language.category,
			triggerAction: 'all',
			name: 'category',
			xtype: 'combo',
            name: 'category',
			width: 250,
            mode: 'local',
            lazyInit: true,
            displayField: 'value',
            valueField: 'name',
            forceSelection: true,
            typeAhead: true,
			allowBlank:false,
			editable: false,
            store: new Ext.data.JsonStore({
                autoLoad: true,
                url: '/main/getCats',
                root: 'rows',
				fields:['name', 'value']
			})
	    },{
			fieldLabel: Language.reg,
			name: 'region',
			xtype: 'combo',
			width: 250,
			store: new Ext.data.JsonStore({
                autoLoad: true,
                url: '/main/getRegions',
                root: 'rows',
				fields:['id', 'value']
			}),
			displayField:'regions',
			mode: 'local',
			typeAhead: true,
			displayField: 'value',
	        triggerAction: 'all',
	        forceSelection:true,
			allowBlank:false,
			editable: false
		},{
			fieldLabel: Language.ann_title,
			name: 'title',
			allowBlank: false,
			width: 250,
			xtype: 'textfield'
		},{
			fieldLabel: Language.text,
			name: 'text',
			allowBlank: false,
			width: 330,
			maxLengthText: 'Максимум 600 символов',
			height: 160,
			maxLength: 600,
			xtype: 'textarea',
			listeners:{
				'keypress': function (n){
				}
			}
		},{
		layout:'column',
            items:[{
                columnWidth:0.8,
				layout: 'form',
                items: [{
					fieldLabel: Language.price,
                    xtype:'textfield',
					name: 'price',
					anchor:'99%'
                }]
            },{
			columnWidth:0.2,
                layout: 'form',
                items: [{
                    xtype: 'combo',
					hideLabel: true,
					name: 'curr',
					labelSeparator: '',
					store: new Ext.data.SimpleStore({
						fields: ['abbr', 'value'],
						data: [['dollar','$'],['euro','\u20ac'],['sum','сум']]
					}),
					mode: 'local',
					displayField:'value',
					valueField: 'abbr',
					triggerAction: 'all',
					typeAhead: true,
					forceSelection:true,
					editable: false,
                    anchor:'82%'
                }]
			}]
		}],
		buttons: [{
				text: Language.add_ann,
				handler: function() {
					 Announce.getForm().submit(
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
	ShowWindow(Announce, Language.addAnnounce, 450, 380);
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
	ShowWindow(forgot, Language.rec_pass, 310, 108);
}
function show_login()
{
	var login = new Ext.FormPanel({
		labelWidth: 75,
		autoHeight: true,
        id: 'user',
		url: '/main/login',
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
	ShowWindow(login, Language.log_sys, 310, 130);
}
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
		items: [{
					fieldLabel: 'Email',
					name: 'email',
					id: 'email',
					vtype:'email',
					blankText: Language.must_email,
					emptyText: 'name@domain.com',
					vtypeText: Language.must_email,
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
					blankText: Language.must_pass,
					minLengthText: Language.min_pass,
					minLength: 6,
					tooltip:{
						tip: Language.enter_pass,
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
	ShowWindow(Regis, Language.reg_form, 430, 210);	
}