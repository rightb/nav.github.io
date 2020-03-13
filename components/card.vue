<template>
	<div class="card" @click="showAlert()">
		<div class="card__image">
			<img :src=user.picture.large>
		</div>
		<div class="card__offset"></div>
		<div class="card__info" v-if="activeIcon === 'name'">
			<p class="card__info_title">
				Hi, My name is
			</p>
			<p class="card__info_subtitle">
				{{user.name.first}} {{user.name.last}}
			</p>
		</div>
		<div class="card__info" v-if="activeIcon === 'email'">
			<p class="card__info_title">
				My email address is
			</p>
			<p class="card__info_subtitle">
				{{user.email}}
			</p>
		</div>
		<div class="card__info" v-if="activeIcon === 'dob'">
			<p class="card__info_title">
				My birthday is
			</p>
			<p class="card__info_subtitle">
				{{dob}}
			</p>
		</div>

		<ul class="icons">
			<li class="icons__item icons__item_name" :class="{icons__item_active: activeIcon === 'name'}" @mouseover="mouseOver('name')"></li>
			<li class="icons__item icons__item_email" :class="{icons__item_active: activeIcon === 'email'}" @mouseover="mouseOver('email')"></li>
			<li class="icons__item icons__item_dob" :class="{icons__item_active: activeIcon === 'dob'}" @mouseover="mouseOver('dob')"></li>
		</ul>
	</div>
</template>
<script>
export default {
	props: ['user'],
	data: () => ({
		activeIcon: 'name'
	}),
	methods: {
		mouseOver(elem){
			this.activeIcon = elem
		},
		showAlert(){
			alert(`My email is ${this.user.email}. Gender is ${this.user.gender}. Age is ${this.user.dob.age}`)
		}
	},
	computed: {
		dob(){
			return Intl.DateTimeFormat('uk-Ua').format(new Date(this.user.dob.date))
		}
	}
}
</script>
<style lang="sass">
	.card
		position: relative
		padding: 20px 0
		width: 100%
		background: #fff
		border-radius: 3px
		box-shadow: 0 0 1px rgba(0,0,0,.5)
		margin-bottom: 20px
		.card__offset
			position: absolute
			width: 100%
			height: 130px
			background-color: #f9f9f9
			top: 0
		.card__info
			position: relative
			.card__info_title
				color: #999
				font-size: 18px
				margin: 0
			.card__info_subtitle
				color: #2c2e31
				font-size: 38px
				margin: 5px
				text-transform: capitalize
		.card__image
			position: relative
			background: #fff
			padding: 5px
			margin: 0px auto
			width: 150px
			height: 150px
			border-radius: 50%
			z-index: 2
			margin-bottom: 30px
			border: 1px solid rgba(0,0,0,.25)
			img
				width: 150px
				border-radius: 50%
	.icons
		list-style-type: none
		margin: 0
		padding: 0
		overflow: hidden
		display: flex
		justify-content: center
		.icons__item
			display: flex
			width: 40px
			height: 48px
			margin: 20px
			background-image: url(../static/card_icons.png)
			background-size: 175px
			transition: all .25s ease-out
			&.icons__item_name
				background-position: 0 -48px
				&.icons__item_active
					background-position: 0 -97px

			&.icons__item_email
				background-position: -68px -48px
				&.icons__item_active
					background-position: -68px -97px
			&.icons__item_dob
				background-position: -135px -48px
				&.icons__item_active
					background-position: -135px -97px

</style>