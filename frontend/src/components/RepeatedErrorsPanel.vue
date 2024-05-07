<template>
                <v-data-table
                    v-if="this.errors[0].statement != null"
                    :headers="headers"
                    :items="indexedItems"
                    :show-expand="true"
                    v-model:expanded="expanded"
                    item-value="statement"
                    items-per-page="10"
                >
                    <template v-slot:expanded-row="{ item }">
                        <tr>
                            <td :colspan="3" class="statement-code pa-8">
                                {{ item.statement }}
                            </td>
                        </tr>
                    </template>

                </v-data-table>

                <v-data-table v-else :headers="headers" :items="errors" items-per-page="10" />


</template>

<script>
export default {
    name: "RepeatedErrorsPanel",
    props: {
        errors: Array,
    },

    data() {
        return {
            headers: [
                {title: "Veateade", key: "message", sortable: false},
                {title: this.errors[0].statement !== undefined ? "Korduste arv" : "Kogus", key: "amount"}
            ],
            expanded: [],
        }
    },

    computed: {
        indexedItems() {
            return this.errors.map((item, index) => ({
                id: index,
                ...item
            }))
        }
    },
}
</script>

<style scoped>

.statement-code {
    font-family: monospace;
}

</style>