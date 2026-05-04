package no.hvl.dat251.backend


import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Assertions


class GroupGenerationTests {

    private val generator = PreferanceGroupGenerator()

    private fun makeRequest(student: Student, preferences: List<Long>) =
        GroupGenerationRequest(
            id = Student,
            preferredStudentIds = preferences
        )

        

    @Test
    @DisplayName("We should be able to create groups from a list of requests")
    fun generateGroups() {
        val dat251 = Subject(name = "DAT251")
        val student1 = Student(name = "Daan")
        dat251.addStudent(student1)
        var otherStudents = mutableListOf()
        for (i in (1 until 19)) {
            var studentName = "Student" + i.toString()
            val student = Student(name = studentName)
            otherStudents.add(student)
            dat251.addStudent(student)
        }
        
        for (student in otherStudents) {

            randomInt1 = Random.nextInt(0, 19)
            randomInt2 = Random.nextInt(0, 19)
            randomStudent1 = otherStudents[randomInt1].id
            randomStudent2 = otherStudents[randomInt2].id

            preference = mutableSetOf(student1.id, randomStudent1, randomStudent2)
            student.groupPreferences.add(dat251.id, preference)
        }
        preference = mutableSetOf(otherStudents[0].id, otherStudents[2].id)
        student1.groupPreferences.add(dat251.id, preference)

        val results = generator.generate(dat251)
        println(results)
    }

    //@Test
    //@DisplayName("Two new students have different ID's")
}