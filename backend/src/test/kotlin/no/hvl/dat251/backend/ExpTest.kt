package no.hvl.dat251.backend

import no.hvl.dat251.backend.entity.Student
import no.hvl.dat251.backend.entity.StudyGroup
import no.hvl.dat251.backend.entity.StudySession
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

class ExpTest {
    @Test
    fun simpleCheckForExpGain() {
        var student = Student(name = "John Doe")
        var group = StudyGroup()
        group.addStudent(student)
        var session = StudySession(subject = "test subject", studyGroup = group)
        session.registerStudent(student)
        assert(student.xp == 0f)
        assert(session.observers.contains(student))
        session.finish()
        assert(student.xp != 0f)
    }
}
