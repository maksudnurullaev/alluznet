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
var save_data = function(btn, statusBar, fn,ln,ph){
        btn = Ext.getCmp(btn);
        statusBar = Ext.getCmp(statusBar);
        btn.disable();
        statusBar.showBusy();
		var stat='';
		Ext.Ajax.request({
        url: '/main/update_data',
        method: 'GET',
        isLoading: true,
		params: {fname: fn, lname: ln, phone: ph},
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

function generateItems(itemlar, header)
{
	var xg = Ext.grid;
	xg.dummyData = eval(itemlar);
	var reader = new Ext.data.ArrayReader({}, [
		{name: 'date', dateFormat: 'j.n.Y h:i:s'},
        {name: 'announce'},
	    {name: 'price',type: 'float'},
        {name: 'tip'},
	    {name: 'category'},
        {name: 'region'}
    ]);
	
    var grid = new xg.GridPanel({
        store: new Ext.data.GroupingStore({
            reader: reader,
            data: xg.dummyData,
            sortInfo:{field: 'date', direction: "DESC"},
            groupField:'tip'
        }),
        columns: [
			{id:'date',header: Language.date, width: 20, sortable: true, dataIndex: 'date' },//tooltip:'Shows icons for - Pending Draft- Lock- Draft Generated (View)'  renderer: Ext.util.Format.dateRenderer('d.m.Y h:i:s')
            {header: Language.announce, width: 60, sortable: true, dataIndex: 'announce'},
            {header: Language.price, width: 20, sortable: true, dataIndex: 'price'},
            {header: Language.type, width: 20, sortable: true, dataIndex: 'tip'},
            {header: Language.category, width: 20, sortable: true, dataIndex: 'category'},
			{header: Language.reg, width: 20, sortable: true, dataIndex: 'region'}
        ],
        view: new Ext.grid.GroupingView({
            forceFit:true,
            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? Language.announces : Language.announce]})'
        }),
        frame:true,
		autoHeight: true,
		sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
        collapsible: true,
        animCollapse: true,
        title: header
    });
	return grid;
}

function getPages(node_id)
{
	var elements = new Array();
	for (i=1;i<=7;i++)
	{
		var store = new Ext.data.JsonStore({
				autoLoad: true,
				baseParams:  {'tip_id':i, 'nodeid': node_id},
				totalProperty: 'totalCount',
				proxy: new Ext.data.HttpProxy({url: '/main/getLastPostsMain', method: 'GET' }),
				method: 'GET',
				root: 'rows',
				fields: [
					'date', 'announce', {name: 'price', type: 'int'}, 'tip', 'category', 'region'
					]
			});
			var grid = {
				xtype: "grid",
				maskDisabled: false,
				store: store,
				columns: [{header: Language.date, width: 20, sortable: true, dataIndex: 'date' },
					{header: Language.announce, width: 60, sortable: true, dataIndex: 'announce'},
					{header: Language.price, width: 20, sortable: true, dataIndex: 'price'},
					{header: Language.type, width: 20, sortable: true, dataIndex: 'tip'},
					{header: Language.category, width: 20, sortable: true, dataIndex: 'category'},
					{header: Language.reg, width: 20, sortable: true, dataIndex: 'region'}
					],
				viewConfig: {
					forceFit:true,
					enableRowBody:true,
					showPreview:true,
					getRowClass : function(record, rowIndex, p, store){
						if(this.showPreview){
							p.body = '<p>'+record.data.excerpt+'</p>';
							return 'x-grid3-row-expanded';
						}
						return 'x-grid3-row-collapsed';
					}
				},

				//frame:true,
				bbar: new Ext.PagingToolbar({
					pageSize: 5,
					store: store,
					displayInfo: true,
					displayMsg: 'Displaying topics {0} - {1} of {2}',
					emptyMsg: "No topics to display",
					// items:[
						// '-', {
						// pressed: true,
						// enableToggle:true,
						// text: 'Show Preview',
						// cls: 'x-btn-text-icon details',
						// toggleHandler: function(btn, pressed){
							// var view = grid.getView();
							// view.showPreview = pressed;
							// view.refresh();
						// }
					// }]
				}),

				autoHeight: true,
				sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
				collapsible: true,
				animCollapse: true,
				title: "fgdfgdfg"
		};
		elements.push(grid);
	}
	return elements;
}


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
			name: tree.attributes.id + '-tab',
			bodyStyle: 'padding: 10',
			layout: 'form',
			title: tree.attributes.text,
			id: tree.attributes.id + '-tab',
			iconCls: tree.attributes.iconCls,
			closable:true,
			items: getPages(tree.attributes.id)
		}).show();
		// Ext.Ajax.request({
			// url: '/main/getLastPostsMain',
			// method: 'GET',
			// params: {
				// 'nodeid' : tree.attributes.id 
			// },
			// success: function(xhr) {
				// var it = generateItems(xhr.responseText,tree.attributes.text);
				// tabpanel.add({
					// border: false,
					// name: tree.attributes.id + '-tab',
					// bodyStyle: 'padding: 10',
					// layout: 'form',
					// title: tree.attributes.text,
					// id: tree.attributes.id + '-tab',
					// iconCls: tree.attributes.iconCls,
					// closable:true,
					// items: [it]
					// }).show();			
			// },
			// failure: function() {
				// Ext.Msg.alert("Grid create failed", "Server communication failure");
			// }
		// });
		
    }
}

function setLang(menu)
{
	Ext.Ajax.request({
        url: '/main/chage_language',
        method: 'GET',
        isLoading: true,
        params: {lang: menu.id},
        callback: function (t1, t2, t3){
			if (t3.responseText=="true")
			{
				location.assign('/main');
			}
		}
    });
}