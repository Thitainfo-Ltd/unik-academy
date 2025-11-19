'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
}

interface Application {
  _id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  message?: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'contacts' | 'applications'>('contacts');

  useEffect(() => {
    // Check if admin is logged in
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      router.push('/admin/login');
      return;
    }

    fetchData();
  }, [router, activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'contacts') {
        const response = await fetch('/api/admin/contacts');
        if (response.ok) {
          const data = await response.json();
          setContacts(data);
        }
      } else {
        const response = await fetch('/api/admin/applications');
        if (response.ok) {
          const data = await response.json();
          setApplications(data);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex gap-4 items-center">
              <Link
                href="/"
                className="text-white hover:text-accent transition-colors"
              >
                View Website
              </Link>
              <button
                onClick={handleLogout}
                className="bg-accent text-primary px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex gap-4 border-b border-gray-300">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'contacts'
                  ? 'text-primary border-b-2 border-accent'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Contact Messages ({contacts.length})
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'applications'
                  ? 'text-primary border-b-2 border-accent'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Job Applications ({applications.length})
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : activeTab === 'contacts' ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {contacts.length === 0 ? (
              <div className="p-8 text-center text-gray-600">
                No contact messages yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Name</th>
                      <th className="px-6 py-4 text-left">Email</th>
                      <th className="px-6 py-4 text-left">Phone</th>
                      <th className="px-6 py-4 text-left">Message</th>
                      <th className="px-6 py-4 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact._id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4">{contact.name}</td>
                        <td className="px-6 py-4">
                          <a
                            href={`mailto:${contact.email}`}
                            className="text-accent hover:underline"
                          >
                            {contact.email}
                          </a>
                        </td>
                        <td className="px-6 py-4">{contact.phone || '-'}</td>
                        <td className="px-6 py-4 max-w-md truncate">{contact.message}</td>
                        <td className="px-6 py-4">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {applications.length === 0 ? (
              <div className="p-8 text-center text-gray-600">
                No job applications yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Name</th>
                      <th className="px-6 py-4 text-left">Email</th>
                      <th className="px-6 py-4 text-left">Phone</th>
                      <th className="px-6 py-4 text-left">Position</th>
                      <th className="px-6 py-4 text-left">Message</th>
                      <th className="px-6 py-4 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((application) => (
                      <tr
                        key={application._id}
                        className="border-t border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">{application.name}</td>
                        <td className="px-6 py-4">
                          <a
                            href={`mailto:${application.email}`}
                            className="text-accent hover:underline"
                          >
                            {application.email}
                          </a>
                        </td>
                        <td className="px-6 py-4">{application.phone}</td>
                        <td className="px-6 py-4">{application.position}</td>
                        <td className="px-6 py-4 max-w-md truncate">
                          {application.message || '-'}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(application.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

