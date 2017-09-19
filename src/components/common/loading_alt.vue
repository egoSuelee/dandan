<template>
	<div class="loading_container">
	    <div class="load_img" :style="{backgroundPositionY: -(positionY%7)*2.5 + 'rem'}">
	    	<img src="/static/loading_alt.gif">
	    </div>
	</div>
</template>

<script>
	
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
	 .loading_container{
    	position: fixed;
    	top: 50%;
    	left: 50%;
    	transform: translate(-50%, -50%);
    	@include wh(2.5rem, 2.5rem);
    }

</style>