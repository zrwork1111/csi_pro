/**

 @Name：layuiAdmin 用户管理 管理员管理 角色管理
 @Author：star1029
 @Site：http://www.layui.com/admin/
 @License：LPPL
    
 */


layui.define(['table', 'form'], function(exports){
  var $ = layui.$
  ,table = layui.table
  ,form = layui.form;
  
  Date.prototype.Format = function(fmt)   
	{ 
	//author:wangweizhen
	  var o = {   
	    "M+" : this.getMonth()+1,                 //月份   
	    "d+" : this.getDate(),                    //日
	    "h+" : this.getHours(),                   //小时   
	    "m+" : this.getMinutes(),                 //分   
	    "s+" : this.getSeconds(),                 //秒   
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
	    "S"  : this.getMilliseconds()             //毫秒   
	  };   
	  if(/(y+)/.test(fmt))   
	    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
	  for(var k in o)   
	    if(new RegExp("("+ k +")").test(fmt))   
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	  return fmt;   
	};

  //部门查询
  table.render({
    elem: '#LAY-user-department'
	,method:"POST"
	,url: 'http://172.18.20.57:10086/csi/dept/queryDept '
	,parseData:function(res){
		if (this.page.curr) {
			var result = res.data.slice(this.limit*(this.page.curr-1),this.limit*this.page.curr);
		} else {
			var result = res.data.slice(0, this.limit);
		}
		
		return{
				"code": res.code,
				"msg":res.msg,
				"count":res.count,
				"data":result
			};
		
	}
    ,cols: [[
      {type: 'checkbox', fixed: 'left'}
      ,{field: 'id', width: 200, title: 'ID', sort: true}
      ,{field: 'name', title: '部门名称', width: 350}
      ,{field: 'remark', title: '详细描述', width: 350, templet: '#imgTpl'}
      ,{title: '操作', width: 400, align: 'center', fixed: 'right', toolbar: '#table-useradmin-admin'}
    ]]
    ,page: true
    ,limit: 7
    ,height: 'full-220'
    ,text: '对不起，加载出现异常！'
  });
  
  //监听工具条
  table.on('tool(LAY-user-department)', function(obj){
	  var data = obj.data;
	    if(obj.event === 'del'){
	      layer.confirm('确定删除此部门？', function(index){
	        obj.del();
	        layer.close(index);
	        $.ajax({
	        	type: "POST",
	        	url: 'http://172.18.20.57:10086/csi/dept/deleteDepts',
	        	data: {id: data.id}
	        });
	      });
    } else if(obj.event === 'edit'){
      var tr = $(obj.tr);

      layer.open({
        type: 2
        ,title: '编辑用户'
        ,content: '../../../views/user/user/userform.html'
        ,maxmin: true
        ,area: ['500px', '450px']
        ,btn: ['确定', '取消']
        ,yes: function(index, layero){
          var iframeWindow = window['layui-layer-iframe'+ index]
          ,submitID = 'LAY-user-front-submit'
          ,submit = layero.find('iframe').contents().find('#'+ submitID);

          //监听提交
          iframeWindow.layui.form.on('submit('+ submitID +')', function(data){
            var field = data.field; //获取提交的字段
            
            //提交 Ajax 成功后，静态更新表格中的数据
            //$.ajax({});
            table.reload('LAY-user-front-submit'); //数据刷新
            layer.close(index); //关闭弹层
          });  
          
          submit.trigger('click');
        }
        ,success: function(layero, index){
          
        }
      });
    }
  });


  //员工查询
  table.render({
    elem: '#LAY-user-employee'
	,method:"POST"
	,url: 'http://172.18.20.57:10086/csi/employee/queryEmployee'
	,parseData:function(res){
			if (this.page.curr) {
				var result = res.data.slice(this.limit*(this.page.curr-1),this.limit*this.page.curr);
			} else {
				var result = res.data.slice(0, this.limit);
			}
			
			return{
					"code": res.code,
					"msg":res.msg,
					"count":res.count,
					"data":result
				};
			
	}
    ,cols: [[
      {type: 'checkbox', fixed: 'left'}
      ,{field: 'id', title: 'id'}
      ,{field: 'jobName', title: '职位名称', width: 350}
      ,{field: 'sex', title: '性别'}
      ,{field: 'name', title: '姓名'}
      ,{field: 'cardid', title: '身份证'}
      ,{field: 'deptName', title: '部门名称'}
      ,{field: 'phone', title: '手机'}
      ,{title: '操作', width: 400, align: 'center', fixed: 'right', toolbar: '#table-useradmin-admin'}
    ]]
    ,page: true
    ,limit: 7
    ,height: 'full-220'
    ,text: '对不起，加载出现异常！'
  });
  
  //监听工具条
  table.on('tool(LAY-user-employee)', function(obj){
	  var data = obj.data;
	    if(obj.event === 'del'){
	      layer.confirm('确定删除此员工？', function(index){
	        obj.del();
	        layer.close(index);
	        $.ajax({
	        	type: "POST",
	        	url: 'http://172.18.20.57:10086/csi/employee/deleteEmployee',
	        	data: {id: data.id}
	        });
	      });
    } else if(obj.event === 'edit'){
      var tr = $(obj.tr);

      layer.open({
        type: 2
        ,title: '编辑用户'
        ,content: '../../../views/user/user/userform.html'
        ,maxmin: true
        ,area: ['500px', '450px']
        ,btn: ['确定', '取消']
        ,yes: function(index, layero){
          var iframeWindow = window['layui-layer-iframe'+ index]
          ,submitID = 'LAY-user-front-submit'
          ,submit = layero.find('iframe').contents().find('#'+ submitID);

          //监听提交
          iframeWindow.layui.form.on('submit('+ submitID +')', function(data){
            var field = data.field; //获取提交的字段
            
            //提交 Ajax 成功后，静态更新表格中的数据
            //$.ajax({});
            table.reload('LAY-user-front-submit'); //数据刷新
            layer.close(index); //关闭弹层
          });  
          
          submit.trigger('click');
        }
        ,success: function(layero, index){
          
        }
      });
    }
  });
  
  
  
  
  
  
  //职位查询
  table.render({
	elem: '#LAY-user-back-job'
	,method:"POST"
	,url: 'http://172.18.20.57:10086/csi/job/queryJob  '
	,parseData:function(res){
			if (this.page.curr) {
				var result = res.data.slice(this.limit*(this.page.curr-1),this.limit*this.page.curr);
			} else {
				var result = res.data.slice(0, this.limit);
			}
			
			return{
					"code": res.code,
					"msg":res.msg,
					"count":res.count,
					"data":result
				};
			
	}		
	,cols: [[
	  {type: 'checkbox', fixed: 'left'}
	  ,{field: 'id', width: 200, title: 'ID', sort: true}
	  ,{field: 'name', title: '职位名称', width: 350}
	  ,{field: 'remark', title: '详细描述', width: 350, templet: '#imgTpl'}
	  ,{title: '操作', width: 400, align: 'center', fixed: 'right', toolbar: '#table-useradmin-admin'}
    ]]
    ,page: true
    ,limit: 7
    ,limits:[7,20,50,100]
    ,height: 'full-220'
    ,text: '对不起，加载出现异常！'
  });
  
  //监听工具条
  table.on('tool(LAY-user-back-job)', function(obj){
	  var data = obj.data;
	    if(obj.event === 'del'){
	      layer.confirm('确定删除此职位？', function(index){
	        obj.del();
	        layer.close(index);
	        $.ajax({
	        	type: "POST",
	        	url: 'http://172.18.20.57:10086/csi/job/deleteJob ',
	        	data: {id: data.id}
	        });
	      });
    }else if(obj.event === 'edit'){
      var tr = $(obj.tr);

      layer.open({
        type: 2
        ,title: '编辑管理员'
        ,content: '../../../views/user/administrators/adminform.html'
        ,area: ['420px', '420px']
        ,btn: ['确定', '取消']
        ,yes: function(index, layero){
          var iframeWindow = window['layui-layer-iframe'+ index]
          ,submitID = 'LAY-user-back-submit'
          ,submit = layero.find('iframe').contents().find('#'+ submitID);

          //监听提交
          iframeWindow.layui.form.on('submit('+ submitID +')', function(data){
            var field = data.field; //获取提交的字段
            
            //提交 Ajax 成功后，静态更新表格中的数据
            //$.ajax({});
            table.reload('LAY-user-front-submit'); //数据刷新
            layer.close(index); //关闭弹层
          });  
          
          submit.trigger('click');
        }
        ,success: function(layero, index){           
          
        }
      })
    }
  });

  //用户查询
  table.render({
    elem: '#LAY-user-back-test'
    , method:"POST"
    ,url: 'http://172.18.20.57:10086/csi/user/queryUser' //模拟接口
    	,parseData:function(res){
    		if (this.page.curr) {
    			var result = res.data.slice(this.limit*(this.page.curr-1),this.limit*this.page.curr);
    		} else {
    			var result = res.data.slice(0, this.limit);
    		}
    		
    		var data = result;
        	for ( var i = 0; i <data.length; i++){
        		var date = new Date(data[i]["createTime"]);
        		data[i].createTime = date.Format("yyyy-MM-dd hh:mm:ss");
        	}
    		
    		return{
    				"code": res.code,
    				"msg":res.msg,
    				"count":res.count,
    				"data":result
    			};
    		
    	}
    ,cols: [[
      {type: 'checkbox', fixed: 'left'}
      ,{field: 'id', width: 80, title: 'ID', sort: true}
      ,{field: 'loginName', title: '登陆名'}
      ,{field: 'password', title: '密码'}
      ,{field: 'status', title: '状态'}
      ,{field: 'createTime', title: '创建时间'}
      ,{field: 'userName', title: '用户名'}
      ,{title: '操作', width: 150, align: 'center', fixed: 'right', toolbar: '#table-useradmin-admin'}
    ]]
    ,page: true
    ,limit: 7
    ,limits:[7,20,50,100]
    ,height: 'full-220'
    ,text: '对不起，加载出现异常！'
  });
  
  //监听工具条
  table.on('tool(LAY-user-back-test)', function(obj){
    var data = obj.data;
    if(obj.event === 'del'){
      layer.confirm('确定删除此角色？', function(index){
        obj.del();
        layer.close(index);
        $.ajax({
        	type: "POST",
        	url: 'http://172.18.20.57:10086/csi/user/deleteUser',
        	data: {id: data.id}
        });
      });
    }else if(obj.event === 'edit'){
      var tr = $(obj.tr);
      
      layer.open({
        type: 2
        ,title: '编辑角色'
        ,content: '../../../views/user/administrators/roleform.html'
        ,area: ['500px', '480px']
        ,btn: ['确定', '取消']
        ,yes: function(index, layero){
          var iframeWindow = window['layui-layer-iframe'+ index]
          ,submit = layero.find('iframe').contents().find("#LAY-user-role-submit");

          //监听提交
          iframeWindow.layui.form.on('submit(LAY-user-role-submit)', function(data){
            var field = data.field; //获取提交的字段
            
            //提交 Ajax 成功后，静态更新表格中的数据
            //$.ajax({});
            table.reload('LAY-user-back-test'); //数据刷新
            layer.close(index); //关闭弹层
          });  
         submit.trigger('click');
        }
        ,success: function(layero, index){
        }
      })
    }
  });

  
  exports('useradmin', {})
});