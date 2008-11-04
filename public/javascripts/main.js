
function tree_click(tree)
{
	tabpanel = Ext.getCmp('main-tab-panel');
	if (tree.leaf)
	{
		tabid = Ext.getCmp(tree.id + '-tab');
		if (tabid)
		{
			tabpanel.setActiveTab(tabid);	
		}
	}
}

function tree_dbclick(tree)
{
	tabpanel = Ext.getCmp('main-tab-panel');
	if (tree.leaf)
	{
		tabid = Ext.getCmp(tree.id + '-tab');
		if (!tabid)
		{
			tabpanel.add({
				title: tree.attributes.text,
				id: tree.attributes.id + '-tab',
				iconCls: tree.attributes.iconCls,
				html: tree.attributes.html,
				closable: true,
			}).show();
		}
	}
}

function first_load()
{

	new Ext.Viewport ({
		layout: 'border',
		id: 'main-window',
		items: [{
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
				split: false,
				
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
                    animate: true,
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
						border: false,
						width: 55
					},{
						xtype: 'button',
						text: '',
						iconCls: 'icon-rus',
						border: false,
						width: 55
					},{
						xtype: 'button',
						text: '',
						iconCls: 'icon-uzb',
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
						border: false,
						margins: '5 0 0 0',
						width: 80,
						id: 'login-button',
						listeners: {
						    'click': show_login
						}
						    
					},{
					    xtype: 'button',
						text: '',
						iconCls: 'tree-1-2',
						margins: '5 0 0 0',
						border: false,
						width: 80
					},{
					    xtype: 'button',
						text: '',
						iconCls: 'tree-1-3',
						html: 'req',
						border: false,
						width: 55
					
					}]


				}]
			}]
		
		},{
			title: 'Main menu',
			region: 'west',
			xtype: 'treepanel',
			margins: '0 0 0 5',
			width: 200,
			split: true,
			minSize: 100,
			maxSize: 300,
			collapsible: true,
			animate: true,

			lines: true,
            useArrows: false, //tuzlishini almashtirish
			autoScroll: true,

			rootVisible: false,
			loader: new Ext.tree.TreeLoader({
				url:'/data.json',
				requestMethod: 'GET',
				baseParams:{format:'json'}			
			}),
						
			
			listeners: {
				'click': tree_click,
				'dblclick': tree_dbclick
			},
			
			root: new Ext.tree.AsyncTreeNode(),
		},{
			title: 'Main tab panel',
			xtype: 'tabpanel',
			id: 'main-tab-panel',
			region: 'center',
			width: 150,
			split: true,
			margins: '0 5 0 0',
			autoScroll: true,
			enableTabScroll: true,
			resizeTabs:true, // turn on tab resizing
			minTabWidth: 120,
			tabWidth:120,
			activeTab: 0,
			items: [{
				html: 'Asosiy Sahifa',
				iconCls:'tree-1-1',
				title: 'Homa page',
			}]

		},{
			html: '<center><h1>Footer</h1></center>',
			region: 'south',
			height: 100,
			collapsible: true,
			split: false,
			margins: '5 5 5 5',

		}]


	});
}


Ext.onReady(first_load);
