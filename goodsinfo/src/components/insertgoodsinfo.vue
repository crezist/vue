<style>
  .bigt{
    float: left;
    margin-top: 100px;
    height: 300px;
    width: 500px;
    font-size: 20px;
    margin-left: 400px;
  }
</style>

<template>
  <div>
    <topup></topup>
    <topshop></topshop>
    <div>
      <table class="bigt">
        <tr>
          <td style="width: 120px;">商品名字:</td>
          <td>
            <input type="text" class="form form-control" v-model="gdname" @blur="selectgdname()"/>
            <i class="text text-danger">{{wa}}</i>
          </td>
        </tr>
        <tr>
          <td>商品特征:</td>
          <td>
            <input type="text" class="form form-control" v-model="gtkeywords" />
          </td>
        </tr>
        <tr>
          <td>上传照片:</td>
          <td>
            <input accept="image/*" type="file" class="form form-control" @change="getfile($event)" style="float: left;"/>
            <button @click="runupfile()" style="float: left;" class="btn btn-link">上传</button>
            <input  type="text" style="background-color: transparent;"  v-model="filename" />
          </td>
        </tr>
        <tr>
          <td>商品价格:</td>
          <td>
            <input type="text" class="form form-control" v-model="price" />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button class="btn btn-primary" @click="runinsert()">上架</button>
            <button class="btn btn-danger" @click="delup()">取消</button>
          </td>
        </tr>
      </table>

    </div>
  </div>
</template>

<script>
  import topshop from '@/components/topshop.vue';
   import topup from '@/components/topup.vue';
  export default{
    components:{
    topshop,
    topup,
    },
    data:function(){
      return{
          stid:0,
          gdname:"",
          wa:"",
          file1:"",
          gtkeywords:"",
          filename:"",
          price:0,

      }
    },
    mounted() {
      this.getstid(this.$route.query.userid);
    },
    methods:{
          getstid(userid){
            var ob=this;
            var url="http://127.0.0.1:8809/xm/Ajax_LidongxuController/selectstoreid"
            $.ajax(url,{
            	data:{"userid":userid},
            	dataType:"json",
            	xhrFields:{"withCredentials":true},
            	success(result){
                 ob.stid=result;
            	}
            	}
              )
          },

           selectgdname(){
             var ob=this;
             var url="http://127.0.0.1:8809/xm/Ajax_LidongxuController/selectgdname"
             $.ajax(url,{
             	data:{"gdname":ob.gdname},
             	dataType:"json",
             	xhrFields:{"withCredentials":true},
             	success(result){
                  if(result){
                    ob.wa="这个名字存在了哟";
                  }else{
                    ob.wa="";
                  }
             	}
             	}
               )
           },
           runinsert(){
             var ob=this;
             if(ob.gdname!=""&&ob.stid!=0&&ob.gtkeywords!=""&&ob.filename!=""&&ob.price!=0){
               ob.insertgoodsinfo();
             }else{
               alert("请填写完整后提交")
             }
           },
           insertgoodsinfo(){
             var ob=this;
             var url="http://127.0.0.1:8809/xm/Ajax_LidongxuController/insertgoodsinfo"
             $.ajax(url,{
             	data:{"gdname":ob.gdname,"stid":ob.stid,"gtkeywords":ob.gtkeywords,"gimgurl":ob.filename,"price":ob.price},
             	dataType:"json",
             	xhrFields:{"withCredentials":true},
             	success(result){
              if(result){
                alert("操作成功");
                ob.$router.back(-1);
              }else{
                alert("操作失败");
                ob.$router.back(-1);
              }
             	}
             	}
               )
           },
           getfile(event){
             this.file1=event.target.files[0];
           },
           upfile() {
             var ob=this;
             var formdata=new FormData();
             formdata.append("file1",this.file1);
              $.ajax({
                  url: "http://127.0.0.1:8809/xm/Ajax_LidongxuController/filecontrollerupload_single",
                  type: "POST",
                  data: formdata,
                  processData: false,
                  contentType: false,
                  cache: false,
                  success: function (result) {
                    ob.filename=result;
                  },
                  });
              },
              delup(){
                this.$router.back(-1);
              },
              runupfile(){
                if(this.file1!=""){
                  this.upfile();
                }else{
                  alert("请先添加文件");
                }
              },

    }
  }
</script>
