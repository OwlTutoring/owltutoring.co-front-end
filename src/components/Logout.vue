<template>
  <div>
    <h1>Logout</h1>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      
    };
  },
  created: function() {
   localStorage.setItem("token", null);
  }
};
</script>

<style>
ul {
  padding: 0;
}
li {
  list-style: none;
}
</style>
