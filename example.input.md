```kotlin


    private fun createFirebasePayload(state: TennisMatchState): Map<String, Any?> {
        val payload = mutableMapOf<String, Any?>()
        
        payload["idt"] = state.idt
        state.fdt?.let { payload["fdt"] = it }
        payload["rival"] = state.config.rivalName
        payload["win"] = state.matchWinner == com.darkwilly08.tennisstats.domain.model.Player.OWNER
        payload["firstService"] = state.config.whoServesFirst == com.darkwilly08.tennisstats.domain.model.Player.OWNER
        
        // Root statistics aggregating completed sets
        val gamesScored = state.sets.sumOf { it.ownerGames + it.rivalGames }
        payload["games"] = gamesScored
        
        val isTiebreak = state.sets.any { it.ownerGames == 7 || it.rivalGames == 7 }
        payload["tiebreak"] = isTiebreak
        payload["supertb"] = state.config.isSuperTieBreakFinalSet && state.activeGame.isSuperTieBreak
        
        // Owner root stats
        payload["me_points_won"] = state.ownerGlobalStats.pointsWon
        payload["me_breaks"] = state.ownerGlobalStats.breaks
        payload["me_break_points"] = state.ownerGlobalStats.breakPoints
        payload["me_serve_won"] = state.ownerGlobalStats.serveWon
        
        // Rival root stats
        payload["him_points_won"] = state.rivalGlobalStats.pointsWon
        payload["him_breaks"] = state.rivalGlobalStats.breaks
        payload["him_break_points"] = state.rivalGlobalStats.breakPoints
        payload["him_serve_won"] = state.rivalGlobalStats.serveWon
        
        // Sets array
        val setsMapList = state.sets.mapIndexed { index, setScore ->
            val setMap = mutableMapOf<String, Any?>(
                "id" to setScore.id,
                "idt" to setScore.idt,
                "fdt" to setScore.fdt,
                "me" to setScore.ownerGames,
                "rival" to setScore.rivalGames,
                "is_complete" to setScore.isComplete,
                "stats" to mapOf(
                    "me" to mapOf(
                        "breaks" to setScore.ownerStats.breaks,
                        "break_points" to setScore.ownerStats.breakPoints,
                        "points_won_serving" to setScore.ownerStats.serveWon
                    ),
                    "him" to mapOf(
                        "breaks" to setScore.rivalStats.breaks,
                        "break_points" to setScore.rivalStats.breakPoints,
                        "points_won_serving" to setScore.rivalStats.serveWon
                    )
                )
            )
            
            if (setScore.ownerTiebreakPoints != null && setScore.rivalTiebreakPoints != null) {
                setMap["tiebreak"] = mapOf(
                    "me" to setScore.ownerTiebreakPoints,
                    "him" to setScore.rivalTiebreakPoints
                )
            }
            
            setMap
        }
        
        payload["sets"] = setsMapList

        // Health Metrics Appending
        state.healthMetrics?.let { hm ->
            payload["health_metrics"] = mapOf(
                "active_calories" to hm.activeCalories,
                "total_steps" to hm.totalSteps,
                "duration_ms" to hm.durationMs,
                "heart_rate" to mapOf(
                    "avg" to hm.avgHeartRate,
                    "max" to hm.maxHeartRate
                )
            )
        }
        
        return payload
    }
```