'use client'

import { useEffect, useState } from 'react'
import { getUser, getUserAgency } from '../../actions'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const AgencyProfile = () => {
  const [agency, setAgency] = useState<any>()
  const [user, setUser] = useState<any>()
  const getAgency = async () => {
    const agency = await getUserAgency()
    setAgency(agency)
  }
  const getAgencyUser = async () => {
    const user = await getUser()
    setUser(user)
  }

  useEffect(() => {
    getAgency()
    getAgencyUser()
  }, [])

  return (
    <div className="page__content">
      <div className="ma__wrap grid lg:grid-cols-10 lg:min-h-[calc(100vh-104px)]">
        <div className="ma__side lg:col-span-3">
          <nav className="ma__nav">
            <ul className="ma__nav_items">
              <li>
                <Link href="/agency/profile">My Account</Link>
              </li>
              <li>
                <Link href="/agency/company">Company Info</Link>
              </li>
              <li>
                <Link href={agency?.id ? `/admin/collections/agency/${agency?.id}`: `/admin/collections/agency/create`}>
                  {agency?.id ? 'Edit Agency' : 'Create Agency'}
                  <ArrowUpRight className="size-6" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="ma__content lg:col-span-7">
          <h2 className="ma__title">Welcome to Ai navi</h2>
          <div className="user__data">
            <div className="user__data_item">
              <p className="user__data_label">Status:</p>
              <p className="user__data_value">{user?.status}</p>
            </div>
            <div className="user__data_item">
              <p className="user__data_label">Company:</p>
              <p className="user__data_value">{user?.name}</p>
            </div>
            <div className="user__data_item">
              <p className="user__data_label">Name:</p>
              <p className="user__data_value">{user?.companyName}</p>
            </div>
            <div className="user__data_item">
              <p className="user__data_label">Email:</p>
              <p className="user__data_value">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgencyProfile
