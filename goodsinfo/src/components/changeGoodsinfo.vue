<style>
  .changetable {
    width: 900px;
    border: 1px #000000;
    margin-left: 300px;
    margin-top: 50px;
    font-size: 20px;
  }
.changetable tr{
  height: 130px;
}
.changetable tr td{
     width: auto;
     text-align: center;
}
</style>

<template>
  <div>
    <toolbar1></toolbar1>
    <toolbar2></toolbar2>
    <div class="showchange">
      <table class="changetable">
        <tr style="height: 10px;">
          <td colspan="2">
            <i class="fa fa-close" style="float: right;margin-left: 20px;cursor: pointer;" @click="backup()"></i>
            <i class="fa" style="float: left;cursor: pointer;color: red;" @click="delectgoodsinfo()">删除</i>
          </td>
        </tr>
        <tr>
          <td>商品名字</td>
          <td>
            <input class="form form-control"  type="text" v-model="gdname"  style="margin-left: 50px;border:1px black;"/>
          </td>
        </tr>
        <tr style="margin-top: 40px;">
          <td>商品样图</td>
          <td >
            <div :style="img" style="width: 80px;height: 120px;background-size: 100%;position: relative;left: 70px;"></div>
            <div style="float: right;">
             <input type="file" @change="getfile($event)" style="float: left;" accept="image/*" class="form form-control"/>
             <button @click="upfile()" class="btn btn-link" style="float: left;">上传</button>
             <input type="text" v-model="filename" />
            </div>
          </td>
        </tr>
        <tr>
          <td>商品价格</td>
          <td>
            <input class="form form-control" style="margin-left: 50px;border:1px black;"  type="text" v-model="sprice" />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button @click="runupdate()" class="btn btn-primary">更改</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import toolbar1 from "@/components/toolbar1"
  import toolbar2 from "@/components/toolbar2"
  export default{
    components:{
      toolbar1,
      toolbar2,
    },
    data:function(){
      return{
        gdid:0,
        gdname:"",
        sprice:0,
        img:{},
        file1:"",
        filename:"",

      }
    },
    mounted() {
      this.gdid=this.$route.query.gdid;
      this.getgoodsinfo();




    },
    methods:{
        getgoodsinfo(){
          var ob=this;
          var url="http://127.0.0.1:8809/xm/Ajax_LidongxuController/getGoodsinfo"
          $.ajax(url,{
          	data:{"gdid":ob.gdid},
          	dataType:"json",
          	xhrFields:{"withCredentials":true},
          	success(result){
               ob.gdname=result.gdname;
               ob.sprice=result.price;
               ob.img={
								"background-image":"url('http://127.0.0.1:8809/xm/tp/"+result.gimgurl+"')",
              };
          	}
          	}
            )
        },
       delectgoodsinfo(){
         var ob=this;
         var url="http://127.0.0.1:8809/xm/Ajax_LidongxuController/delectgoodsinfo"
         $.ajax(url,{
         	data:{"gdid":ob.gdid},
         	dataType:"json",
         	xhrFields:{"withCredentials":true},
         	success(result){
              if(result){
                alert("操作成功");
                ob.$router.back(-1);
              }else{
                alert("服务器很忙哦!")
              }
         	}
         	}
           )
       } ,
       backup(){
         this.$router.back(-1);
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
          updategoodsinfo(){
            var ob=this;
            var url="http://127.0.0.1:8809/xm/Ajax_LidongxuController/updategdoosinfo"
            $.ajax(url,{
            	data:{"gdid":ob.gdid,"gdname":ob.gdname,"gimgurl":ob.filename,"price":ob.sprice},
            	dataType:"json",
            	xhrFields:{"withCredentials":true},
            	success(result){
                 if(result){
                   alert("操作成功，返回上一页");
                   ob.$router.back(-1);
                 }else{
                   alert("抱歉");
                 }
            	}
            	}
              )
          },
          runupdate(){
            var ob=this;
            if(ob.gdname!=""&&ob.filename!=""&&ob.sprice!=0){
              ob.updategoodsinfo();
            }else{
              alert("请填写完整!")
            }
          },



    }
  }
</script>
