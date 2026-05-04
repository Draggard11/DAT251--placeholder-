package no.hvl.dat251.backend


import jakarta.transaction.Transactional
import no.hvl.dat251.backend.entity.GroupPreference
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
    @Transactional
    @DisplayName("test for genearating with group ")
    fun genareateGroupsForDAT251(){
        val subject = subjectRepository
            .findBySubjectCode("DAT251")
            .orElseThrow { RuntimeException("Subject not found") }
        val results = generator.generate(subject)
        println(results)

    }
        

    @Test
    @DisplayName("We should be able to create groups from a list of requests")
    fun generateGroups() {
        val dat251 = Subject(subjectCode = "DAT255")

        val student1 = Student(name = "Daan", email = "daan@uib.no")
        studentRepository.save(student1)
        dat251.addStudent(student1)
        var otherStudents = mutableListOf<Student>()
        for (i in (0 until 19)) {
            var studentName = "Student $i"
            var studentEmail = "test$i@test.no"
            val student = Student(name = studentName, email = studentEmail)
            otherStudents.add(student)
            dat251.addStudent(student)
            studentRepository.save(student)
        }

        subjectRepository.save(dat251)

        otherStudents.forEach { student ->

            // Always include student1
            val prefToStudent1 = GroupPreference(
                student = student,
                subject = dat251,
                preferredStudentID = student1.id
            )
            student.preferences.add(prefToStudent1)

            // Add 2 more random preferences
            val randomPrefs = otherStudents
                .filter { it.id != student.id && it.id != student1.id }
                .shuffled()
                .take(2)

            randomPrefs.forEach { prefStudent ->
                val pref = GroupPreference(
                    student = student,
                    subject = dat251,
                    preferredStudentID = prefStudent.id
                )
                student.preferences.add(pref)
            }
        }
        println("subject id befor test: ${dat251.id}")
        var preferdStudents = mutableListOf(otherStudents[0].id, otherStudents[2].id)
        for (prefstudent in otherStudents) {
            val pref = GroupPreference(
                student = student1,
                subject = dat251,
                preferredStudentID = prefstudent.id
            )
            student1.preferences.add(pref)
        }
        studentRepository.save(student1)
        println(dat251.students.size)
        val results = generator.generate(dat251)
        println(results)
    }

    //@Test
    //@DisplayName("Two new students have different ID's")
}