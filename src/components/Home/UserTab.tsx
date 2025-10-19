interface UserTabProps {
  name: string;
  email: string;
}

export default function UserTab({ name, email }: UserTabProps) {
  return (
    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
        U
      </div>

      <div>
        <p className="font-medium text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
}
