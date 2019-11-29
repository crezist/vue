<template>
  <div>
    <div style="height:150px;">
      <topup></topup>
      <topshop></topshop>
    </div>
    <div class="container">
      <table class="table table-hover">
        <thead>
          <tr>
            <td>订单号</td>
            <td>名称</td>
            <td>尺码</td>
            <td>价格</td>
            <td>下单日期</td>
            <td>买家姓名</td>
            <td>买家地址</td>
            <td>虚拟电话</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="odr in order">
            <td>{{odr.olid}}</td>
            <td>{{odr.gdname}}</td>
            <td>{{odr.gsid}}</td>
            <td>{{odr.price}}</td>
            <td>{{odr.ofdate}}</td>
            <td>{{odr.address}}</td>
            <td>{{odr.recipient}}</td>
            <td>{{odr.contactnumber}}</td>
            <td><button class="btn btn-success" @click="toorder(odr.olid)">发货</button></td>
          </tr>
        </tbody>
      </table>
    </div>


  </div>
</template>

<script>
  import topshop from '@/components/topshop.vue';
   import topup from '@/components/topup.vue';
   export default {
     components:{
       topshop,
       topup,

     },
     data(){
       return{
         stid:1,
         order:[]
       }
     },
     methods:{
       //订单发货
       toorder(olid){
         var ob=this;
          var url="http://127.0.0.1:8809/xm/StoreinfoController/insertstoreorder";
          $.ajax(url,{
            data:{
              "olid":olid,
            },
            xhrFields:{"withCredentials":true},
          	success(result){
             alert("出货成功");
             
          	}
          })
       },
       //查询商店未发货订单
      selectorder(){
        var ob=this;
         var url="http://127.0.0.1:8809/xm/StoreinfoController/selectorderbyshop";
         $.ajax(url,{
           data:{
             "stid":ob.stid,
           },
           xhrFields:{"withCredentials":true},
         	success(result){
            ob.order=result
         	}
         })
      },
     },
     mounted() {
       // this.stid=this.$route.query.stid;
       this.selectorder()
     }
     }
</script>

<style>
</style>
