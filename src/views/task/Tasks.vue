<template>
	<v-container>
		<v-container>
			<v-row>
				<v-col cols="12">
					<draggable v-model="items" class="row">
						<v-card width="100%" class="mt-2 mb-2">
							<v-card-text>
								{{ activeTask.nome }}
							</v-card-text>
						</v-card>
					</draggable>
				</v-col>
				<v-col cols="6">
					<draggable v-model="items" class="row">
						<v-card
							width="100%"
							class="mt-2 mb-2"
							v-for="item in recentTasks"
							:key="item.id"
							:color="item.cor"
						>
							<v-card-text>
								{{ item.nome }}
							</v-card-text>
						</v-card>
					</draggable>
				</v-col>
				<v-col>
                    <draggable>
                        
                    </draggable>
                </v-col>
			</v-row>
		</v-container>
	</v-container>
</template>

<script>
import draggable from "vuedraggable";
import { mapActions, mapState } from "vuex";
export default {
	name: "Tasks",

	components: {
		draggable,
	},

	data: () => ({
		items: [
			{
				id: 1,
				title: "abc",
				img:
					"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
			},
			{
				id: 3,
				title: "ghi",
				img:
					"https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
			},
			{
				id: 4,
				title: "jkl",
				img:
					"https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0OTQxOH0",
			},
			{
				id: 5,
				title: "mno",
				img:
					"https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
			},
			{
				id: 2,
				title: "def",
				img:
					"https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0OTQxOH0",
			},
		],
	}),

	computed: {
		...mapState("home", ["activeTask", "recentTasks"]),
	},

	methods: {
		...mapActions("home", ["ActionFilterRecenteTasks", "ActionGetActive"]),
	},

	created() {
		this.ActionGetActive();
		this.ActionFilterRecenteTasks();
	},
};
</script>