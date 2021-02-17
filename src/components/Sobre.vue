<template>
	<v-menu
		v-model="menu"
		:close-on-content-click="false"
		:nudge-width="100"
		offset-x
	>
		<template v-slot:activator="{ on, attrs }">
			<v-btn icon v-bind="attrs" v-on="on">
				<v-icon>mdi-information</v-icon>
			</v-btn>
		</template>

		<v-card class="pa-0 ma-0">
			<v-card-text class="pa-0 ma-0">
				<v-list>
					<v-list-item>
						<v-list-item-avatar>
							<v-btn icon @click="changeColor">
								<v-icon :color="color">mdi-fire</v-icon>
							</v-btn>
						</v-list-item-avatar>

						<v-list-item-content>
							<v-list-item-title
								>Jeferson Menezes</v-list-item-title
							>
						</v-list-item-content>

						<v-list-item-icon>
							<v-btn icon @click="conhecer">
								<v-icon>mdi-linkedin</v-icon>
							</v-btn>
						</v-list-item-icon>
					</v-list-item>
				</v-list>

				<v-divider></v-divider>

				<v-list>
					<v-list-item>
						<v-list-item-action>
							<v-btn icon @click="contribuir">
								<v-icon>mdi-github</v-icon>
							</v-btn>
						</v-list-item-action>
						<v-list-item-title>Quero contribuir</v-list-item-title>
					</v-list-item>

					<v-list-item>
						<v-list-item-action>
							<v-btn icon @click="contribuir">
								<v-icon>mdi-timer</v-icon>
							</v-btn>
						</v-list-item-action>
						<v-list-item-title
							>Tasktimer -
							<span class="cyan--text font-weight-medium">
								version : {{ version }}
							</span>
						</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-card-text>
		</v-card>
	</v-menu>
</template>

<script>
import { ipcRenderer } from "electron";
export default {
	name: "Sobre",

	data: () => ({
		menu: false,
		color: "red",
		colors: ["orange darken-4", "red", "amber darken-2", "amber lighten-1"],
		index: 0,
		version: 0.1,
	}),

	methods: {
		changeColor() {
			this.index++;
			if (this.index >= this.colors.length) this.index = 0;
			this.color = this.colors[this.index];
		},

		contribuir() {
			ipcRenderer.send(
				"open-link",
				"https://github.com/jeferson-menezes/tasktimer"
			);
		},

		conhecer() {
			ipcRenderer.send(
				"open-link",
				"https://www.linkedin.com/in/jeferson-menezes-274a8596/"
			);
		},
	},
};
</script>