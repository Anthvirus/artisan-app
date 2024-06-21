import Chat from '../components/chat';
import Client from '../components/client';
import Header from '../components/connectionheader';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-200">
      <Header heading={`Chat with ${Client.firstname+" "+ Client.lastname}`} link="Back to Home" href="/artisandashboard"/>
      <Chat/>
    </div>
  );
}
