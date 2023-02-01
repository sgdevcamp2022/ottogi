package devcamp.ottogi.userservice.controller;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

//public class testFile {
//    @PersistenceContext
//    static EntityManager em;
//
//    public static void main(String[] args) {
//
//        System.out.println("====================");
//        Query query = em.createQuery("select f from Friend as f");
//        System.out.println("====================");
////
////        query.setParameter("userId", 1);
////        System.out.println("====================");
//
//        List resultList = query.getResultList();
//        for (Object o : resultList) {
//            System.out.println("o = " + o);
//        }
//        System.out.println("====================");
//
//    }
//}
