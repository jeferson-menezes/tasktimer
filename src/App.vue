<template>
	<v-app>
		<MessageSnack />
		
		<TaskForm />

		<NoteForm />
		

		<v-navigation-drawer app v-model="drawer"> </v-navigation-drawer>

		<v-app-bar app dense elevation="0">
			<!-- <v-btn small icon>
				<v-icon color="green"> mdi-record</v-icon>
			</v-btn>
			<v-btn small icon>
				<v-icon color="yellow"> mdi-record</v-icon>
			</v-btn>
			<v-btn small icon @click="close">
				<v-icon color="red"> mdi-record</v-icon>
			</v-btn> -->
			<v-spacer></v-spacer>

			<v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
				<v-icon v-if="$vuetify.theme.dark">mdi-palette-outline</v-icon>
				<v-icon v-else>mdi-palette</v-icon>
			</v-btn>
		</v-app-bar>

		<v-main>
			<v-container fluid>
				<router-view></router-view>
			</v-container>
		</v-main>

		<v-footer app absolute elevation="0">
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
import { closeWindow, maximizeWindow, minimizeWindow } from "./renderer";

export default {
	name: "App",

	components: { TaskForm, MessageSnack, NoteForm },

	data: () => ({
		drawer: false,
	}),

	computed: {
		routerLinks() {
			return this.$router.options.routes;
		},
	},

	methods: {
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
	},
};
</script>
