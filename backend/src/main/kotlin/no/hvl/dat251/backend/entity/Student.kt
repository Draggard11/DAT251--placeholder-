package no.hvl.dat251.backend
import lombok.Getter

@Getter
public class Student(
    val name: String
) {
    
    //@id
    //@GenerateValue(strategy = GenerationType.IDENTITY)
    //private val: Long = id

    //private val: String = name
    private var activeSubjects: List<String> = ArrayList<String>()
    private var passedSubjects: List<String> = ArrayList<String>()

}