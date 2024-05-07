/* eslint-disable */
<template>

    <div class="text-h6 py-3">Rühma kokkuvõte</div>

    <v-card class="py-10 rounded-0">

        <div v-if="analysis.totalCount > 0">

            <v-row class="px-16" justify="space-between">
                <v-table class="pl-16" style="width: 520px;">
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td>Päringute koguarv:</td>
                        <td>{{ analysis.totalCount }}</td>
                    </tr>
                    <tr>
                        <td>Edukate päringute arv:</td>
                        <td>
                            <v-chip color="green">
                                {{ analysis.validCount }}
                                ({{ (100 * analysis.validCount / (analysis.totalCount)).toFixed(1) }}%)
                            </v-chip>
                        </td>
                    </tr>
                    <tr>
                        <td>Vigaste päringute arv:</td>
                        <td>
                            <v-chip color="red">
                                {{ this.$props.analysis.errorCount }}
                                ({{ (100 * analysis.errorCount / (analysis.totalCount)).toFixed(1) }}%)
                            </v-chip>
                        </td>
                    </tr>
                    <tr>
                        <td>Ühekordsete vigade arv:</td>
                        <td>{{ this.$props.analysis.uniqueErrorCount }}</td>
                    </tr>
                    </tbody>
                </v-table>

                <v-progress-circular
                    class="mr-16 mt-6"
                    :size="160"
                    :width="30"
                    :model-value="100 * analysis.errorCount / analysis.totalCount"
                    color="red-lighten-1"
                    bg-color="light-green-lighten-1"
                />
            </v-row>
        </div>
        <p v-else class="pa-8">Valitud ajavahemikus ei tehtud ühtegi päringut.</p>
    </v-card>
</template>

<script>
export default {
    name: "AnalysisSummary",
    props: {
        analysis: {
            totalCount: Number,
            errorCount: Number,
            uniqueErrorCount: Number,
            validCount: Number,
        }
    },
}
</script>

<style scoped>

</style>