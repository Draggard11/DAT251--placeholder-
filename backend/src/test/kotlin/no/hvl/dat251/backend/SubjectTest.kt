package no.hvl.dat251.backend



import no.hvl.dat251.backend.entity.Student
import no.hvl.dat251.backend.entity.StudyGroup
import no.hvl.dat251.backend.entity.Subject
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Assertions

class SubjectTest {

    @Test
    @DisplayName("Test new subject does not have Students and groups")
    fun StudentsAndGroupsAreEmptyTest() {
        var subject = Subject()
        Assertions.assertTrue(subject.students.isEmpty())
        Assertions.assertTrue(subject.studyGroups.isEmpty())
    }

    @Test
    @DisplayName("test add student to subject")
    fun addStudentTest() {
        var subject = Subject()
        var student = Student(name = "John Doe")
        subject.addStudent(student)
        Assertions.assertTrue(subject.students.size == 1)
        Assertions.assertTrue(subject.students.contains(student))
    }

    @Test
    @DisplayName("test add group to subject")
    fun addGroupTest() {
        var group = StudyGroup()
        var student = Student(name = "John Doe")
        group.addStudent(student)
        var subject = Subject()
        subject.addGroup(group)
        Assertions.assertTrue(subject.studyGroups.size == 1)
    }

}