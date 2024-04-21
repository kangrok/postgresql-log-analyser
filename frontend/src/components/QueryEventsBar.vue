<template>
    <v-container class="px-8">

        <v-row class="py-2 justify-center">
            <template v-for="group in queryEventGroups" :key="group.time">
                <v-card
                    class="rounded-0"
                    elevation="0"
                    :width="getGroupLength(group.count)"
                    :height="48"
                    :color="group.valid ? 'light-green-lighten-1' : 'red-lighten-1'"
                >
                    <v-tooltip activator="parent" location="bottom" class="text-center">
                        {{ group.count }} {{ getGroupDescription(group) }}
                        <br/>
                        {{ group.time }}
                    </v-tooltip>
                </v-card>
            </template>
        </v-row>

        <v-row class="px-6 d-flex justify-space-between flex-row">
            <div class="time-marker">
                Algus:
                <br/>
                {{ queryEventGroups[0].time }}
            </div>

            <div class="time-marker text-end">
                Lõpp:
                <br/>
                {{ queryEventGroups[queryEventGroups.length - 1].time }}
            </div>
        </v-row>

    </v-container>
</template>

<script>
export default {
    name: "QueryEventsBar",
    props: {
        queryEventGroups: Array,
        totalQueryCount: Number,
    },

    methods: {
        getGroupLength(queryCount) {
            return Math.round(586 * queryCount / this.$props.totalQueryCount);
        },

        getGroupDescription(group) {
            if (group.valid && group.count === 1) return 'korrektne päring'
            else if (group.valid) return 'korrektset päringut'
            else if (group.count === 1) return 'vigane päring'
            else return 'vigast päringut'
        }
    }
}
</script>

<style scoped>

.time-marker {
    font-size: 12px;
}

</style>