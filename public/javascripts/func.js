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
// Ext.apply(Ext.form.VTypes, {
     // password : function(val, field) {
        // if (field.initialPassField) {
            // var pwd = Ext.getCmp(field.initialPassField);
            // return (val == pwd.getValue());
        // }
        // return true;
    // },
    // passwordText : 'Passwords do not match'
// });
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
//Функция для изменение язика

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