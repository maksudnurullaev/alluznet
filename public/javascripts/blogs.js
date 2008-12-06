Ext.apply(Ext.form.VTypes, {
    password: function(val, field) {
        if (field.initialPassField) {
            var pwd = Ext.getCmp(field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
    }, 
    passwordText: 'Passwords do not match'
});

function tree_dbclick(tree)
{
	treepath = tree.id;
	tabpanel = Ext.getCmp('main-tab-panel');
    tabid = Ext.getCmp(tree.id + '-tab');
    textid = tree.id   + '-tab-text';
	if (!tabid)
    {
		tabpanel.add({
			border: false,
            title: tree.attributes.text,
            id: tree.attributes.id + '-tab',
            iconCls: tree.attributes.iconCls,
            closable: true,
			/*listeners:{
				'activate': tab_activate
			}*/
        }).show();
    }
}

var treetxt = {
			title: Language.sections,
			region: 'west',
			xtype: 'treepanel',
			margins: '0 0 0 5',
            id: 'main-tree',
			width: 200,
			split: true,
			minSize: 100,
			maxSize: 300,
			collapsible: true,
			animate: true,
            lines: true,
			rootVisible: false,
            useArrows: false, 
			autoScroll: true,
			root: new Ext.tree.AsyncTreeNode({
				id: 'root'
			}),
            listeners: {
				//'click': tree_click,
				'dblclick': tree_dbclick
			},
			loader: treeloader
		}; 

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
			}],
			bbar: stbar	
			};
		
var footer = {
			html: '<center><h1>Footer</h1></center>',
			region: 'south',
			height: 100,
			collapsible: true,
			split: false,
			margins: '5 5 5 5'

		};
