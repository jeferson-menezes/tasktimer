<template>
	<v-app>
		<MessageSnack />

		<TaskForm />

		<NoteForm />

		<vue-confirm-dialog></vue-confirm-dialog>

		<v-navigation-drawer app v-model="drawer"> </v-navigation-drawer>

		<v-app-bar app dense elevation="0">
			<Sobre/>
			<v-spacer></v-spacer>

			<v-btn icon @click="updateThemeDark(!themeDark)">
				<v-icon v-if="$vuetify.theme.dark">mdi-palette-outline</v-icon>
				<v-icon v-else>mdi-palette</v-icon>
			</v-btn>
		</v-app-bar>

		<v-main>
			<v-container fluid>
				<router-view></router-view>
			</v-container>
		</v-main>

		<v-footer app absolute class="pa-1" elevation="0">
			<v-btn
				color="pink"
				fab
				dark
				small
				absolute
				top
				right
				@click.stop="openFormTask"
			>
				<v-icon>mdi-plus</v-icon>
			</v-btn>
			<v-bottom-navigation shift elevation="0">
				<v-btn
					v-for="(item, index) in routerLinks"
					:key="index"
					:to="item.path"
				>
					<span>{{ item.meta.title }}</span>
					<v-icon>{{ item.meta.icon }}</v-icon>
				</v-btn>
			</v-bottom-navigation>
		</v-footer>
	</v-app>
</template>

<script>
import TaskForm from "./components/TaskForm";
import NoteForm from "./components/NoteForm";
import MessageSnack from "./components/MessageSnack";
import Sobre from './components/Sobre'
import { closeWindow, maximizeWindow, minimizeWindow } from "./renderer";
import { mapActions, mapState } from "vuex";
import { Config, KeyConfig } from "./model/config";

export default {
	name: "App",

	components: { TaskForm, MessageSnack, NoteForm , Sobre},

	data: () => ({
		drawer: false,
	}),

	computed: {
		...mapState("config", ["themeDark"]),
		routerLinks() {
			return this.$router.options.routes;
		},
	},

	methods: {
		...mapActions("config", ["ActionGetThemeDark", "ActionSetThemeDark"]),

		openFormTask() {
			this.$root.$emit("task-form-open");
		},

		close() {
			closeWindow();
		},
		maximize() {
			maximizeWindow();
		},
		minimize() {
			minimizeWindow();
		},

		updateThemeDark(value) {
			const config = new Config(KeyConfig.THEME_DARK, value);
			this.ActionSetThemeDark(config);
		},
	},

	watch: {
		themeDark(o, n) {
			this.$vuetify.theme.dark = this.themeDark;
		},
	},

	mounted() {
		this.$vuetify.theme.dark = this.themeDark;
	},

	created() {
		this.ActionGetThemeDark();
	},
};
</script>
