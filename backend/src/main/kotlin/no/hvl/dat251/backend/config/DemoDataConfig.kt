package no.hvl.dat251.backend.config

import no.hvl.dat251.backend.entity.GroupPreference
import no.hvl.dat251.backend.entity.Student
import no.hvl.dat251.backend.entity.StudyGroup
import no.hvl.dat251.backend.entity.StudySession
import no.hvl.dat251.backend.entity.Subject
import no.hvl.dat251.backend.repository.StudentRepository
import no.hvl.dat251.backend.repository.StudyGroupRepository
import no.hvl.dat251.backend.repository.StudySessionRepository
import no.hvl.dat251.backend.repository.SubjectRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.password.PasswordEncoder
import java.sql.Date
import java.sql.Time
import java.time.LocalDateTime
import java.time.ZoneId
import kotlin.collections.forEach

@Configuration
class DemoDataConfig {

    @Bean
    fun initData(
        studentRepo: StudentRepository,
        subjectRepo: SubjectRepository,
        studySessionRepo: StudySessionRepository,
        studygroupRepo: StudyGroupRepository,
        passwordEncoder: PasswordEncoder
    ) = CommandLineRunner {

        // Create subject
        val subject = subjectRepo.save(
            Subject(subjectCode = "DAT251")
        )
        val dat355 = subjectRepo.save(
            Subject(
                subjectCode = "DAT355"
            )
        )
        val demoStudent = studentRepo.save(
            Student(
                name = "Aksel",
                email = "aksel@uib.no",
                xp = 64.5f,
                passwordHash = passwordEncoder.encode("123")!!
            )
        )
        subject.addStudent(demoStudent)
        // Create 19 students
        val students = (2..20).map { i ->
            studentRepo.save(
                Student(
                    name = "Student $i",
                    email = "student$i@test.com"
                )
            )
        }
        val start = LocalDateTime.now()
            .plusDays(1)
            .withHour(12)
            .withMinute(0)
            .withSecond(0)
            .withNano(0)

        val end = start.withHour(14)
        val studysession = studySessionRepo.save(
            StudySession(
                subject = dat355.subjectCode,
                startTime = Date.from(start.atZone(ZoneId.systemDefault()).toInstant()),
                endTime = Date.from(end.atZone(ZoneId.systemDefault()).toInstant()),
                completed = false
            )
        )



        studygroupRepo.save(
            StudyGroup(
                name = "my friendly group",
                students = mutableSetOf(demoStudent, students[0]),
                studySessions = mutableSetOf(studysession)
            )
        )


        // Add students to subject
        students.forEach { subject.addStudent(it) }
        subjectRepo.save(subject)

        // Add preferences (in-memory only)
        students.forEach { student ->

            // Always include student1
            val prefToStudent1 = GroupPreference(
                student = student,
                subject = subject,
                preferredStudentID = demoStudent.id
            )
            student.preferences.add(prefToStudent1)

            // Add 2 more random preferences
            val randomPrefs = students
                .filter { it.id != student.id && it.id != demoStudent.id }
                .shuffled()
                .take(2)

            randomPrefs.forEach { prefStudent ->
                val pref = GroupPreference(
                    student = student,
                    subject = subject,
                    preferredStudentID = prefStudent.id
                )
                student.preferences.add(pref)
            }
        }

        studentRepo.saveAll(students + demoStudent)
        println("✅ Demo data loaded")
    }
}