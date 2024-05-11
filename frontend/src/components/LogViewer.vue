/* eslint-disable */
<template>
    <v-card>
        <v-container class="pa-4">

            <v-card-actions>
                <v-btn color="primary" :onclick="expandAll">Pikenda päringud</v-btn>
                <v-btn color="primary" :onclick="closeAll">Lühenda päringud</v-btn>
            </v-card-actions>

            <v-data-table :headers="headers" :items="indexedItems" :show-expand="true" v-model:expanded="expanded"
                          items-per-page="15" items-per-page-text="Päringute arv leheküljel:">

                <template v-slot:[`item.timestamp`]="{ value }">
                    {{ new Date(value).toLocaleString('en-GB') }}
                </template>

                <template v-slot:[`item.errorType`]="{ item, value }">
                    <div v-if="item.internal_query" >
                        <v-chip color="orange" size="small" class="mt-2">
                            {{ errorTypes.function }}
                        </v-chip>
                    </div>
                    <div>
                        <v-chip :color="value === 'VALID' ? 'green' : 'red'" size="small" class="my-2">
                            {{ errorTypes[value] }}
                        </v-chip>
                    </div>
                </template>

                <template v-slot:[`item.statementError`]="{ item, isExpanded, internalItem }">
                    <v-container class="px-0">

                        <span v-if="isExpanded(internalItem)"
                              class="statement-code"
                              style="white-space: pre-wrap">
                            {{ item.statement }}
                        </span>
                        <span v-else-if="isShort(item.statement)"
                              class="statement-code">
                            {{ item.statement }}
                        </span>
                        <span v-else
                              class="statement-code">
                        {{ item.statement.replace(/\s\s+/g, ' ').slice(0, 63) }}...
                        </span>

                        <div v-if="isExpanded(internalItem) && item.message" class="pt-2">
                            <v-divider class="pb-2"/>
                            <div style="color: red">
                                {{ item.message }}
                            </div>
                            <div v-if="item.internal_query">
                                Context: {{ item.context }}
                            </div>
                        </div>

                    </v-container>
                </template>

                <template #[`item.data-table-expand`]="{ item, internalItem, toggleExpand, isExpanded }">
                    <td v-if="!isShort(item.statement) || item.errorType !== 'VALID'">
                        <v-btn
                            :icon="isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                            size="small"
                            variant="text"
                            @click="toggleExpand(internalItem)"
                        />
                    </td>
                </template>
            </v-data-table>

        </v-container>
    </v-card>
</template>

<script>
export default {
    name: "LogViewer",
    props: {
        log: Array,
    },

    data() {
        return {
            headers: [
                {title: "Aeg", key: "timestamp", sortable: false, width: 170},
                {title: "Vea tüüp", key: "errorType", sortable: false},
                {title: "Päring", key: "statementError", sortable: false},
            ],
            expanded: [],
            errorTypes: {
                VALID: 'Korrektne',
                SYNTAX: 'Süntaks',
                NON_EXISTENT_VALUE: 'Defineerimata',
                CONSTRAINT_VIOLATION: 'Kitsendus',
                TYPO: 'Trükiviga',
                AGGREGATE: "Agregatsioon",
                ALREADY_EXISTS: 'Topelt defineerimine',
                DATATYPE_MISMATCH: 'Andmetüübid',
                CUSTOM_EXCEPTION: 'Enda veateade',
                OTHER: 'Muu',
                function: 'Funktsioon',
            },
        }
    },

    computed: {
        indexedItems() {
            return this.log.map((item, index) => ({
                id: index,
                ...item
            }))
        }
    },

    methods: {
        expandAll() {
            this.expanded = this.$props.log.map((_, id) => id);
        },

        closeAll() {
            this.expanded = [];
        },

        isShort(stmt) {
            return stmt.replace(/\s\s+/g, " ").length < 65;
        }
    },
}
</script>

<style scoped>
.statement-code {
    font-family: monospace;
    font-size: 13px;
}

</style>