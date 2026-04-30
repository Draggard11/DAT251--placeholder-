package no.hvl.dat251.backend.groupgeneration

import no.hvl.dat251.backend.entity.GroupGenerationRequest
import org.springframework.stereotype.Service

@Service
class RandomGroupGenerator : GroupGenerator {
    override fun generate(requests: List<GroupGenerationRequest>): List<List<Long>> {
        //GroupGenerationRequests should hold: 
        //1. The student's ID
        //2. The preferences of that student
        val n = requests.size
        val idToIndex = requests.mapIndexed { index, req ->
            req.id to index
        }.toMap()
        // We create a n-by-n matrix for looking up scores
        val scores = Array(n) {
            IntArray(n)
        }

        // 
        for (req in requests) {
            val i = idToIndex[req.id]!!

            for (pref in req.preferences) {
                val j = idToIndex[pref] ?: continue
                scores[i][j] += 1
            }
        }

        val groups = mutableListOf<PotentialGroup>()

        //Hardcoded for groupsizes of 4. and classes of less than 32.
        for (a in 0 until n-3) {
            for (b in a+1 until n-2) {
                for (c in b+1 until n-1) {
                    for (d in c+1 until n) {
                        val members = intArrayOf(a, b, c, d)
                        var groupScore = 0
                        for(i in members) {
                            for(j in members) {
                                groupScore += scores[i][j]
                            }
                        }
                        val mask = (1 shl a) or (1 shl b) or (1 shl c) or (1 shl d)
                        groups.add(PotentialGroup(members,group_score, mask))
                    }
                }
            }
        }

        groups.sortByDescending {it.score}
        var usedMask = 0
        val chosen = mutableListOf<PotentialGroup>()

        for (g in groups) {
            if ((g.mask and usedMask) == 0) {
                chosen.add(g)
                usedMask = usedMask or g.mask

                if (chosen.size == n / 4) break
            }
        } 
        
        val chosenGroups = mutableListOf<List<Long>>()
        for (c in chosen) {
            val memberIds = c.members.map {indexToId[it]!!}
            chosenGroups.add(memberIds)
        }

        return chosenGroups
    }

}

data class PotentialGroup(
    val members: IntArray, 
    val score: Int,
    val mask: Int)

