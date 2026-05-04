package no.hvl.dat251.backend


import no.hvl.dat251.backend.entity.Student
import no.hvl.dat251.backend.entity.Subject
import no.hvl.dat251.backend.groupgeneration.PreferanceGroupGenerator
import no.hvl.dat251.backend.repository.StudentRepository
import no.hvl.dat251.backend.repository.SubjectRepository
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Assertions
import org.springframework.beans.factory.annotation.Autowired
import kotlin.random.Random

@SpringBootTest
class GroupGenerationTests {
    @Autowired
    lateinit var subjectRepository: SubjectRepository
    @Autowired
    lateinit var studentRepository: StudentRepository
    private val generator = PreferanceGroupGenerator()

        

    @Test
    @DisplayName("We should be able to create groups from a list of requests")
    fun generateGroups() {
        val dat251 = Subject(subjectCode = "DAT251")
        subjectRepository.save(dat251)
        val student1 = Student(name = "Daan")
        studentRepository.save(student1)
        dat251.addStudent(student1)
        var otherStudents = mutableListOf<Student>()
        for (i in (0 until 19)) {
            var studentName = "Student $i"
            val student = Student(name = studentName)
            otherStudents.add(student)
            dat251.addStudent(student)
            studentRepository.save(student)
        }
        
        for (student in otherStudents) {

            var randomInt1 = Random.nextInt(0, 19)
            var randomInt2 = Random.nextInt(0, 19)
            var randomStudent1 = otherStudents[randomInt1].id
            var randomStudent2 = otherStudents[randomInt2].id

            var preference = setOf(student1.id, randomStudent1, randomStudent2)
            student.groupPreferences[dat251.id] =  preference
        }
        println("subject id befor test: ${dat251.id}")
        var preference = mutableSetOf(otherStudents[0].id, otherStudents[2].id)
        student1.groupPreferences[dat251.id] = preference
        println(dat251.students.size)
        val results = generator.generate(dat251)
        println(results)
    }

    //@Test
    //@DisplayName("Two new students have different ID's")
}