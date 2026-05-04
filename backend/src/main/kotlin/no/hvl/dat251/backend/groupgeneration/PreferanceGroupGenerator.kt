package no.hvl.dat251.backend.groupgeneration

import no.hvl.dat251.backend.entity.GroupGenerationRequest
import org.springframework.stereotype.Service
import no.hvl.dat251.backend.entity.Student
import no.hvl.dat251.backend.entity.Subject
import no.hvl.dat251.backend.entity.StudyGroup

@Service
class PreferanceGroupGenerator : GroupGenerator {
    override fun generate(subject: Subject): List<List<Long>> {
        //We get all students taking the subject and add their prefererences for that subject to a map
        val students = subject.students
        println("students: ${students.size}")
        println("subject id in generation: ${subject.id}}")
        val prefList = mutableMapOf<Long, Set<Long>>()

        for (student in students) {
            val prefs = student.preferences
                .filter { it.subject?.id == subject.id }
                .mapNotNull { it.preferredStudentID }
                .toSet()

            prefList[student.id!!] = prefs
        }
        //prefList should be a map of each student in a subject to its preferences
        
        val n = students.size
        val entries = prefList.entries.toList()
        println(prefList)
        val groups = mutableListOf<PotentialGroup>()
        //Hardcoded for groupsizes of 4. SubjectSize is limited to <32 members (bitwise operators)  
        for (a in 0 until n-3) {
            for (b in a+1 until n-2) {
                for (c in b+1 until n-1) {
                    for (d in c+1 until n) {
//
                        val members = listOf(
                            entries[a],
                            entries[b],
                            entries[c],
                            entries[d]
                        )
//                         val members = listOf(
//                             prefList.entries.elementAt(a),
//                             prefList.entries.elementAt(b),
//                             prefList.entries.elementAt(c),
//                             prefList.entries.elementAt(d)
//                             )
                        var groupScore = 0

                        for(i in members) {
                            for(j in members) {
                                if (j.key in i.value) {
                                    groupScore += 1
                                }
                            }
                        }
                        val mask = (1 shl a) or (1 shl b) or (1 shl c) or (1 shl d)
                        val studs = members.map { it.key }
                        groups.add(PotentialGroup(studs, groupScore, mask))
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
            chosenGroups.add(c.members)
        }

        return chosenGroups
    }
}

data class PotentialGroup(
    val members: List<Long>, 
    val score: Int,
    val mask: Int
    )

