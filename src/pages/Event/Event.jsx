import React, { useRef, useState } from 'react'
import { Pagination } from "../../modules/Pagination/Pagination"
import styles from "./Event.module.css"
import { Link } from '../../components'

export const Event = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const eventList = useRef(
    Array.from({ length: 8 }, (_, i) => {
      const randomDate = new Date()
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 365))
      return {
        id: i + 1,
        title: `202${i + 1} 축복식`,
        new_order: `/event/${i + 1}/create`,
        order_list: `/event/${i + 1}`,
        start_date: randomDate.toLocaleDateString("ko-KR"),
        end_date: randomDate.toLocaleDateString("ko-KR")
      }
    })
  ).current

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = eventList.slice(indexOfFirstItem, indexOfLastItem)

    return (
        <>
          <div className={styles.eventTableBackground}>
            <section className={styles.tableWrap}>
              <h2 className={styles.tableTitle}>현재 진행중인 대회 목록</h2>
              <table className={styles.table}>
                <tr>
                  <th scope="col">제목</th>
                  <th scope="col">시작기간</th>
                  <th scope="col">종료기간</th>
                  <th scope="col">주문서 작성</th>
                  <th scope="col">주문서 목록</th>
                </tr>
                {currentItems.map((event) => (
                  <tr>
                    <td>{event.title}</td>
                    <td>{event.start_date}</td>
                    <td>{event.end_date}</td>
                    <td>
                      <Link to={event.new_order} className={styles.link}>주문서 작성</Link>
                    </td>
                    <td>
                      <Link to={event.order_list} className={styles.link}>주문서 목록 이동</Link>
                    </td>
                  </tr>
                ))}
              </table>
              <Pagination
                className={styles.pagination}
                currentPage={currentPage}
                totalItems={eventList.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </section>
          </div>
        </>
    )
}