var banner = {
			height:  100,
			region: 'north',
			margins: '5 5 5 5',
			
			split: false,
			border: false,
			layout: 'border',
			items: [{
				html: '<img src="../images/banner.gif" style="width: 100%; height: 100%">',
				autoScroll: true,
				region: 'center',
				border: true,
				split: false
				
			},{
				layout: 'border',
				region: 'east',
				
				border: true,
				split: false,
				width: 75,
				margins: '0 0 0 5',
				layout: 'accordion',
				layoutConfig: {
                                    titleCollapse: false,
                                    animate: true
                                },
                                collapseFirst: true,
                                items: [{
                        
                                        border: false,
					autoHeight: true,
					title: 'Language',
					margins: '0 0 0 5',
					layout: 'table',
					items: [{
					    xtype: 'button',
						text: '',
						iconCls: 'icon-eng',
						id: 'language-eng',
						border: false,
						width: 55
					},{
						xtype: 'button',
						text: '',
						iconCls: 'icon-rus',
						id: 'language-rus',
						border: false,
						width: 55
					},{
						xtype: 'button',
						text: '',
						iconCls: 'icon-uzb',
						id: 'language-uzb',
						border: false,
						width: 55
                                        }]
				},{
					height: 65,
					border: false,
					title: 'Login',
					autoHeight: true,
					margins: '5 0 0 5',
					layout: 'table',
					items: [{
					    xtype: 'button',
						text: '',
						iconCls: 'tree-2-1',
						id: 'button-login',
						border: false,
						margins: '5 0 0 0',
						width: 80,
						listeners: {
						    'click': show_login
						}
						    
					},{
					    xtype: 'button',
						text: '',
						iconCls: 'tree-1-2',
						id: 'button-account',
						margins: '5 0 0 0',
						border: false,
						width: 80,
                                                listeners: {
						    'click': show_Registration
						}
                                                
					},{
					    xtype: 'button',
						text: '',
						iconCls: 'tree-1-3',
						id: 'button-request',
						html: 'req',
						border: false,
						width: 55
					
					}]


				}]
			}]
		
		};
		
var tabpanel = {
			title: 'Main tab panel',
			xtype: 'tabpanel',
			id: 'main-tab-panel',
			region: 'center',
			width: 150,
			split: true,
			margins: '0 5 0 0',
                        tabPosition: 'top',
			autoScroll: true,
			enableTabScroll: true,
			resizeTabs:true, // turn on tab resizing
			minTabWidth: 120,
			tabWidth:120,
			activeTab: 0,
                        border: false,
			items: [{
				html: 'HOME PAGE',
				iconCls: 'tree-1-3',
				title: 'Homa page',
                                id: 'MainTab',
                                border: true
			}]
                        
                        

		};
		
var footer = {
			html: '<center><h1>Footer</h1></center>',
			region: 'south',
			height: 100,
			collapsible: true,
			split: false,
			margins: '5 5 5 5'

		};
