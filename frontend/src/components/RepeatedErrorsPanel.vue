<template>
    <v-expansion-panels>
        <v-expansion-panel title="Korduvad vead" >
            <v-expansion-panel-text>
                <v-data-table
                    v-if="this.errors[0].statement != null"
                    :headers="headers"
                    :items="errors"
                    :show-expand="true"
                    v-model:expanded="expanded"
                    item-value="statement"
                    items-per-page="-1"
                >
                    <template v-slot:expanded-row="{ item }">
                        <tr>
                            <td :colspan="3" class="statement-code pa-8">
                                {{ item.statement }}
                            </td>
                        </tr>
                    </template>
                    <template #bottom></template>
                </v-data-table>

                <v-data-table v-else :headers="headers" :items="errors" items-per-page="-1" >
                    <template #bottom></template>
                </v-data-table>

            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
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
                {title: "Veateade", key: "message", sortable: false, width: 450},
                {title: this.errors[0].statement != null ? "Korduste arv" : "Kogus", key: "amount", width: 100}
            ],
            expanded: [],
        }
    },
}
</script>

<style scoped>

.statement-code {
    font-family: monospace;
}

</style>