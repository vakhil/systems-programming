import React, { useState } from 'react';
import { Search, Code2, Cpu, Network, Database, Filter, Sparkles } from 'lucide-react';

interface SyscallEntry {
  name: string;
  category: 'Virtual Memory' | 'Networking Sockets' | 'I/O Multiplexing' | 'File & Storage' | 'Cryptographic Hashes';
  signature: string;
  header: string;
  description: string;
  usedInProject: string;
  gotchaTip: string;
}

const SYSCALLS_DATA: SyscallEntry[] = [
  {
    name: 'sbrk',
    category: 'Virtual Memory',
    header: '<unistd.h>',
    signature: 'void* sbrk(intptr_t increment);',
    description: 'Increments process data segment by increment bytes. Passing 0 queries the current program break address.',
    usedInProject: 'Custom Heap Memory Allocator',
    gotchaTip: 'sbrk() is not thread-safe. In multi-threaded allocators, use mmap() or protect sbrk with a mutex.'
  },
  {
    name: 'mmap',
    category: 'Virtual Memory',
    header: '<sys/mman.h>',
    signature: 'void* mmap(void *addr, size_t length, int prot, int flags, int fd, off_t offset);',
    description: 'Maps files or anonymous physical pages directly into process virtual address space.',
    usedInProject: 'Custom Heap Memory Allocator & Storage Engine',
    gotchaTip: 'Always pass MAP_PRIVATE | MAP_ANONYMOUS when allocating heap memory to avoid disk-backed file mappings.'
  },
  {
    name: 'munmap',
    category: 'Virtual Memory',
    header: '<sys/mman.h>',
    signature: 'int munmap(void *addr, size_t length);',
    description: 'Deletes mappings for the specified address range, causing physical pages to be reclaimed by OS kernel.',
    usedInProject: 'Custom Heap Memory Allocator',
    gotchaTip: 'Length must be a multiple of page size (usually 4096 bytes). Unmapping unaligned ranges fails with EINVAL.'
  },
  {
    name: 'socket',
    category: 'Networking Sockets',
    header: '<sys/socket.h>',
    signature: 'int socket(int domain, int type, int protocol);',
    description: 'Creates an unbound socket communications endpoint and returns a file descriptor.',
    usedInProject: 'Sockets Chat, Redis Clone, Load Balancer, BitTorrent',
    gotchaTip: 'Use AF_INET for IPv4, SOCK_STREAM for TCP, and SOCK_DGRAM for UDP.'
  },
  {
    name: 'setsockopt',
    category: 'Networking Sockets',
    header: '<sys/socket.h>',
    signature: 'int setsockopt(int sockfd, int level, int optname, const void *optval, socklen_t optlen);',
    description: 'Manipulates options for the socket file descriptor, such as reuse of local addresses.',
    usedInProject: 'Sockets Chat, Redis, Load Balancer',
    gotchaTip: 'Always enable SO_REUSEADDR to avoid annoying "Address already in use" errors during rapid server restarts.'
  },
  {
    name: 'accept4',
    category: 'Networking Sockets',
    header: '<sys/socket.h>',
    signature: 'int accept4(int sockfd, struct sockaddr *addr, socklen_t *addrlen, int flags);',
    description: 'Extracts the first connection request on the listening queue and atomically applies flags like SOCK_NONBLOCK.',
    usedInProject: 'Sockets Chat & Load Balancer',
    gotchaTip: 'Using accept4 with SOCK_NONBLOCK saves an extra fcntl() system call per accepted client connection!'
  },
  {
    name: 'epoll_create1',
    category: 'I/O Multiplexing',
    header: '<sys/epoll.h>',
    signature: 'int epoll_create1(int flags);',
    description: 'Creates a new epoll instance in the Linux kernel and returns an epoll file descriptor.',
    usedInProject: 'Sockets Chat & Redis Engine',
    gotchaTip: 'Pass 0 or EPOLL_CLOEXEC. Never use legacy epoll_create(size) which ignores the size argument.'
  },
  {
    name: 'epoll_wait',
    category: 'I/O Multiplexing',
    header: '<sys/epoll.h>',
    signature: 'int epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout);',
    description: 'Suspends the thread in kernel space until monitored file descriptors become ready for I/O.',
    usedInProject: 'Sockets Chat Server',
    gotchaTip: 'When using Edge-Triggered mode (EPOLLET), you MUST read/write until getting EAGAIN, otherwise events will stall.'
  },
  {
    name: 'sendfile',
    category: 'File & Storage',
    header: '<sys/sendfile.h>',
    signature: 'ssize_t sendfile(int out_fd, int in_fd, off_t *offset, size_t count);',
    description: 'Transfers data between file descriptors directly within kernel space without copying to userspace buffers.',
    usedInProject: 'Baremetal Blogging Engine',
    gotchaTip: 'in_fd must support mmap-like operations (a regular file). out_fd must be a socket.'
  },
  {
    name: 'splice',
    category: 'File & Storage',
    header: '<fcntl.h>',
    signature: 'ssize_t splice(int fd_in, off64_t *off_in, int fd_out, off64_t *off_out, size_t len, unsigned int flags);',
    description: 'Moves data between two file descriptors (one must be a pipe) without copying between kernel and userspace.',
    usedInProject: 'L4 / L7 Load Balancer',
    gotchaTip: 'Allows true zero-copy TCP stream proxying with maximum bandwidth and minimal CPU load.'
  },
  {
    name: 'pread',
    category: 'File & Storage',
    header: '<unistd.h>',
    signature: 'ssize_t pread(int fd, void *buf, size_t count, off_t offset);',
    description: 'Reads bytes at a specific offset without modifying the file descriptor seek pointer. Thread-safe!',
    usedInProject: 'Baremetal Blogging Engine & Storage Engine',
    gotchaTip: 'Unlike read(), multiple concurrent threads can call pread() on the same file descriptor safely.'
  },
  {
    name: 'sha1_transform',
    category: 'Cryptographic Hashes',
    header: '<openssl/sha.h> or RFC 3174',
    signature: 'void SHA1(const unsigned char *d, size_t n, unsigned char *md);',
    description: 'Calculates the 160-bit (20-byte) cryptographic digest of arbitrary binary buffers.',
    usedInProject: 'Git From Scratch, BitTorrent, RFC 6455 WebSockets',
    gotchaTip: 'Git hashes object data with a prepended header `<type> <length>\\0`, not bare file bytes!'
  }
];

export const SyscallCodex: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'Virtual Memory', 'Networking Sockets', 'I/O Multiplexing', 'File & Storage', 'Cryptographic Hashes'];

  const filtered = SYSCALLS_DATA.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.signature.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === 'All' || s.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-cyan-300 font-semibold text-xs shadow-sm">
          <Code2 className="w-3.5 h-3.5" />
          <span>FOUNDATIONAL POSIX &amp; KERNEL INTERFACES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Systems Syscall &amp; API Reference
        </h1>
        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          The essential system calls, cryptographic functions, and networking interfaces you will master.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search syscall or keyword..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 outline-none transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                selectedCat === c
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Syscall Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((syscall) => (
          <div
            key={syscall.name}
            className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-lg hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-cyan-300 font-mono">{syscall.name}()</span>
                <span className="text-xs text-slate-500 font-mono">{syscall.header}</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300 font-medium">
                {syscall.category}
              </span>
            </div>

            <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed">
              {syscall.signature}
            </pre>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {syscall.description}
            </p>

            <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs">
              <div className="text-xs text-slate-400">
                <span className="text-cyan-400 font-semibold">Used In: </span>
                {syscall.usedInProject}
              </div>
              <div className="text-xs text-amber-300/90 bg-amber-950/20 p-2.5 rounded-xl border border-amber-900/30">
                <span className="font-bold">Engineer&apos;s Tip: </span>
                {syscall.gotchaTip}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
