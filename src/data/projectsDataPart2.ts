import { Project } from '../types';

export const PROJECTS_DATA_EXTENDED: Project[] = [
  {
    id: 'redis-clone',
    title: 'In-Memory Key-Value Store & Redis RESP Engine',
    tagline: 'Build a blazing-fast in-memory database with the Redis Serialization Protocol (RESP)',
    badge: 'Database Engines',
    difficulty: 'Intermediate',
    estimatedHours: '20-30 hours',
    category: 'Database Engines',
    shortDesc: 'Construct an in-memory key-value database from scratch supporting the Redis Serialization Protocol (RESP), hash tables with progressive rehashing, TTL key expiration, and RDB disk snapshots.',
    accentColor: {
      primary: 'rose',
      gradient: 'from-rose-500 to-pink-500',
      badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      borderHover: 'hover:border-rose-500/50',
      glowShadow: 'rgba(244, 63, 94, 0.15)'
    },
    languages: [
      {
        name: 'C',
        tag: 'C',
        badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        why: 'Redis was written in ANSI C by Salvatore Sanfilippo (antirez). Building it in C teaches raw memory and socket mastery.',
        starterTip: 'Write your own custom hash table struct with chaining before handling RESP.'
      },
      {
        name: 'Go',
        tag: 'Go',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
        why: 'Goroutines and channels make testing multi-client concurrency enjoyable.',
        starterTip: 'Use `bufio.Reader` to parse CRLF-delimited RESP frames.'
      },
      {
        name: 'Rust',
        tag: 'Rust',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
        why: 'Enforce thread-safety and lock-free dictionary access patterns.',
        starterTip: 'Use `std::collections::HashMap` initially, then swap with a custom hash table.'
      }
    ],
    scope: {
      overview: 'Redis is the most popular in-memory data store in the world. Its secret is simplicity: a single-threaded event loop, high-performance hash tables, and a lightweight text/binary protocol called RESP. In this project, you will write a server that works with official `redis-cli`!',
      whatYouWillBuild: [
        'A TCP server listening on port 6379',
        'RESP Parser: Simple Strings (`+`), Errors (`-`), Integers (`:`), Bulk Strings (`$`), Arrays (`*`)',
        'Commands: `PING`, `SET`, `GET`, `DEL`, `EXISTS`, `INCR`, `KEYS`',
        'TTL Expiration engine using a min-heap or active background sampling',
        'Official client support: run standard `redis-cli -p 6379` and execute commands!'
      ],
      whatYouWontUse: ['NO existing Redis libraries', 'NO serialization frameworks', 'NO AI copilot assistance'],
      realWorldComparison: 'This is the foundational architecture of Redis, KeyDB, and DragonFly.'
    },
    videoTour: {
      durationSeconds: 615,
      durationFormatted: '10:15',
      title: 'Full ~10-Min Video Tour: Building a Redis Clone from Scratch',
      overviewSummary: 'In this 10-minute visual walkthrough, discover why Redis avoids multi-threaded locking by relying on a single-threaded event loop, how the wire RESP protocol is tokenized, and run official redis-benchmark at 100,000 ops/sec.',
      instructorName: 'Alex M. (Database Internals Lead)',
      masterclass: {
        youtubeId: 'B7WatlkR57s',
        title: 'Build Your Own Redis from Scratch with Vanilla Node.js & TCP',
        author: 'SWE with Vivek Bharatha',
        duration: '22:30',
        description: 'Direct step-by-step code implementation of an in-memory key-value database: raw TCP socket listener, SET/GET/DEL command dispatcher, and RESP framing.',
        tag: 'Solution Code: TCP & Redis Engine'
      },
      playlist: [
        {
          youtubeId: 'B7WatlkR57s',
          title: 'Build Your Own Redis from Scratch with Vanilla Node.js & TCP',
          author: 'SWE with Vivek Bharatha',
          duration: '22:30',
          description: 'Direct step-by-step code implementation of an in-memory key-value database: raw TCP socket listener, SET/GET/DEL command dispatcher, and RESP framing.',
          tag: 'Solution: TCP & Redis Engine'
        },
        {
          youtubeId: 'qk97UeHvq6Y',
          title: 'Redis From Scratch: Building the RESP Protocol Deserializer',
          author: 'Code & Learn',
          duration: '16:45',
          description: 'Low-level byte parsing of the REdis Serialization Protocol (RESP): parsing Simple Strings (+), Bulk Strings ($), Integers (:), and Arrays (*).',
          tag: 'RESP Wire Protocol Solution'
        },
        {
          youtubeId: 'VhcTWvrmiow',
          title: 'Building Redis, From First Principles',
          author: 'Mohak Gupta (Systems Engineer)',
          duration: '18:50',
          description: 'A deep-dive tutorial implementing an in-memory key-value database from scratch: TCP socket framing, RESP protocol deserialization, and commands.',
          tag: 'First Principles & Architecture'
        }
      ],
      chapters: [
        {
          timeSeconds: 0,
          timestamp: '00:00',
          title: 'The Secret of Redis: Single-Threaded Simplicity',
          description: 'Why multi-threaded locks degrade in-memory latency and how Redis achieves 100K+ operations per second.',
          subtitle: 'Welcome! Today we are building Redis from scratch. Notice how everything lives directly in RAM with zero disk bottlenecks.',
          scene: {
            type: 'overview',
            headline: 'Single-Threaded Event Loop vs Locking Overhead',
            visualSnippet: 'Disk DB (Postgres/MySQL): ~5-15 milliseconds latency (Disk I/O)\nIn-Memory Redis:          ~0.05-0.1 milliseconds latency (RAM L1/L2 Cache)',
            calloutText: 'Because RAM operations take nanoseconds, locks are unnecessary on a single thread.'
          }
        },
        {
          timeSeconds: 140,
          timestamp: '02:20',
          title: 'Tokenizing the RESP Wire Protocol',
          description: 'Parsing arrays, bulk strings, integers, and simple strings over raw TCP sockets.',
          subtitle: 'RESP is binary-safe because byte lengths are always specified upfront. Let us trace a SET command on the wire.',
          scene: {
            type: 'architecture',
            headline: 'RESP Framing: *3\\r\\n$3\\r\\nSET\\r\\n$4\\r\\nname\\r\\n$5\\r\\nAlice\\r\\n',
            visualSnippet: '*3   -> Array of 3 elements\n$3   -> Bulk string length 3 ("SET")\n$4   -> Bulk string length 4 ("name")\n$5   -> Bulk string length 5 ("Alice")\n+OK  -> Server simple string response',
            calloutText: 'Binary safe: can store raw images, compressed bytes, or strings.'
          }
        },
        {
          timeSeconds: 280,
          timestamp: '04:40',
          title: 'Live Demo: Interoperating with Official redis-cli',
          description: 'Connecting standard `redis-cli` and executing PING, SET, GET, and INCR commands.',
          subtitle: 'Watch as we open the standard redis-cli. The official client thinks it is communicating with production Redis.',
          scene: {
            type: 'demo',
            headline: 'Official redis-cli Verification & Commands',
            visualSnippet: '$ redis-cli -p 6379\n127.0.0.1:6379> PING\nPONG\n127.0.0.1:6379> SET user:101 "Linus" EX 60\nOK\n127.0.0.1:6379> GET user:101\n"Linus"\n127.0.0.1:6379> INCR visits\n(integer) 1',
            calloutText: 'Demonstrates 100% command syntax compatibility.'
          }
        },
        {
          timeSeconds: 430,
          timestamp: '07:10',
          title: 'Code Walkthrough: Hash Tables & TTL Expiration',
          description: 'Implementing collision chaining and passive vs active key expiration algorithms.',
          subtitle: 'We examine both passive expiration on GET lookups and an active background daemon that randomly samples TTL keys.',
          scene: {
            type: 'code',
            headline: 'Passive & Active Key Eviction Engine',
            visualSnippet: 'if (entry->expire_at > 0 && current_time_ms() > entry->expire_at) {\n    hash_table_delete(dict, key);\n    return send_nil_response(client_fd);\n}',
            calloutText: 'Ensures expired keys are cleanly reclaimed from RAM.'
          }
        },
        {
          timeSeconds: 545,
          timestamp: '09:05',
          title: 'Saturation Benchmark: 100,000 Operations / Second',
          description: 'Benchmarking throughput with redis-benchmark and wrapping up.',
          subtitle: 'Here we run redis-benchmark with 50 concurrent clients. Our handcrafted server sustains 100,000 requests per second effortlessly.',
          scene: {
            type: 'benchmark',
            headline: 'redis-benchmark Run: 100,000 Requests',
            visualSnippet: '$ redis-benchmark -p 6379 -t set,get -q\nSET: 104,166.66 requests per second\nGET: 112,359.55 requests per second\np99 Latency: 0.82 ms',
            calloutText: 'Proves the raw speed of a handcrafted in-memory database.'
          }
        }
      ]
    },
    gettingStarted: {
      prerequisites: [
        'Python 3 or Go or C (GCC)',
        'Official `redis-cli` (`brew install redis` or `apt install redis-tools`)',
        'Standard terminal shell'
      ],
      projectStructure: `my_redis/
├── main.py
├── resp.py
├── storage.py
└── test_client.sh`,
      visualArchitectureImage: {
        caption: 'In-Memory Store Architecture: RESP Tokenizer, Command Dispatcher, and Hash Dictionary',
        diagramType: 'In-Memory Database Engine',
        elements: [
          { id: '1', title: 'TCP Socket Listener (:6379)', desc: 'Accepts connections from redis-cli and official language drivers.', color: 'rose', role: 'Wire Gateway' },
          { id: '2', title: 'RESP Parser / Tokenizer', desc: 'Decodes Arrays, Bulk Strings, and Integers into command arguments.', color: 'cyan', role: 'Protocol Decoder' },
          { id: '3', title: 'In-Memory Hash Dictionary', desc: 'O(1) dictionary mapping keys to strings, integers, or byte objects.', color: 'emerald', role: 'Data Storage' },
          { id: '4', title: 'TTL Expiration Heap', desc: 'Tracks expiration timestamps to evict stale keys and free memory.', color: 'amber', role: 'Eviction Engine' }
        ],
        connections: [
          'redis-cli sends *3\\r\\n$3\\r\\nSET... -> RESP Parser extracts ["SET", "key", "val"]',
          'Command Dispatcher executes operation on In-Memory Dictionary',
          'Server formats result (+OK\\r\\n or $4\\r\\n...) -> Sends to TCP client'
        ]
      },
      starterFileName: 'redis_starter.py',
      starterLanguage: 'Python',
      starterCode: `import socket
import sys

def parse_resp(stream):
    first_byte = stream.read(1)
    if not first_byte:
        return None
    
    if first_byte == b'*':
        # Array of elements
        num_elements = int(stream.readline().strip())
        return [parse_resp(stream) for _ in range(num_elements)]
    elif first_byte == b'$':
        # Bulk string
        length = int(stream.readline().strip())
        if length == -1:
            return None
        data = stream.read(length)
        stream.read(2) # Consume trailing \\r\\n
        return data.decode('utf-8', errors='ignore')
    elif first_byte == b'+':
        return stream.readline().strip().decode('utf-8')
    elif first_byte == b':':
        return int(stream.readline().strip())
    return None

def main():
    store = {}
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind(('127.0.0.1', 6379))
    server.listen(128)
    print("[REDIS] Handcrafted server listening on 127.0.0.1:6379")
    print("[HINT] Connect using: redis-cli -p 6379")

    while True:
        client_sock, _ = server.accept()
        stream = client_sock.makefile('rb')
        try:
            while True:
                cmd_parts = parse_resp(stream)
                if not cmd_parts:
                    break

                cmd = cmd_parts[0].upper()
                print(f"[CMD] {cmd_parts}")

                if cmd == "PING":
                    client_sock.sendall(b"+PONG\\r\\n")
                elif cmd == "SET" and len(cmd_parts) >= 3:
                    store[cmd_parts[1]] = cmd_parts[2]
                    client_sock.sendall(b"+OK\\r\\n")
                elif cmd == "GET" and len(cmd_parts) >= 2:
                    val = store.get(cmd_parts[1])
                    if val is not None:
                        encoded = val.encode('utf-8')
                        client_sock.sendall(f"\${len(encoded)}\\r\\n{val}\\r\\n".encode())
                    else:
                        client_sock.sendall(b"$-1\\r\\n")
                elif cmd == "DEL" and len(cmd_parts) >= 2:
                    deleted = 1 if store.pop(cmd_parts[1], None) is not None else 0
                    client_sock.sendall(f":{deleted}\\r\\n".encode())
                else:
                    client_sock.sendall(b"-ERR unknown command\\r\\n")
        finally:
            client_sock.close()

if __name__ == '__main__':
    main()`,
      codeBreakdown: [
        { lines: 'Lines 4-23', concept: 'Recursive RESP Parser', detail: 'Recursively parses arrays `*` and bulk strings `$` from the raw byte stream.' },
        { lines: 'Lines 26-32', concept: 'Socket Gateway Setup', detail: 'Binds to the official Redis port 6379 with SO_REUSEADDR enabled.' },
        { lines: 'Lines 43-55', concept: 'Command Execution Engine', detail: 'Handles `PING`, `SET`, `GET`, and `DEL`, returning valid formatted RESP responses.' }
      ],
      quickstartCommands: [
        'python3 redis_starter.py',
        '# In another terminal window:\nredis-cli -p 6379 PING',
        'redis-cli -p 6379 SET mykey "Hello Handcrafted Redis"',
        'redis-cli -p 6379 GET mykey'
      ],
      expectedOutput: `[REDIS] Handcrafted server listening on 127.0.0.1:6379
[HINT] Connect using: redis-cli -p 6379
[CMD] ['PING']
[CMD] ['SET', 'mykey', 'Hello Handcrafted Redis']
[CMD] ['GET', 'mykey']`
    },
    milestones: [
      {
        step: 1,
        id: 'resp-parser',
        title: 'RESP Protocol Tokenizer',
        goal: 'Parse the Redis Serialization Protocol over raw TCP sockets.',
        specs: [
          'Listen on port 6379: Bind and accept TCP connections from standard Redis clients.',
          'Parse RESP Array: Read first byte. If `*`, read integer until `\\r\\n` to get argument count `N`. Loop `N` times parsing each element.',
          'Parse RESP Bulk String: If byte is `$`, read integer length `L` until `\\r\\n`. Read exact `L` payload bytes, then consume trailing `\\r\\n`.',
          'Encode RESP Responses: Simple String: `+OK\\r\\n`. Error: `-ERR unknown command\\r\\n`. Integer: `:42\\r\\n`. Nil Bulk String: `$-1\\r\\n`.'
        ],
        syscallsOrConcepts: ['RESP Specification', 'CRLF Delimited Streams', 'Buffer Parsing'],
        checkpoint: 'Running `redis-cli ping` prints `PONG`.',
        manualHandCheck: 'Send malformed RESP frames via netcat; server must return `-ERR Protocol error` without crashing.'
      },
      {
        step: 2,
        id: 'hash-table',
        title: 'In-Memory Dictionary & SET/GET',
        goal: 'Implement an in-memory dictionary and wire up SET and GET commands.',
        specs: [
          'Hash table struct: Implement bucket array with collision chaining using linked lists or open addressing.',
          'Command SET: When `SET <key> <val>` is received, compute key hash, insert or update key-value pair in hash map, return `+OK\\r\\n`.',
          'Command GET: When `GET <key>` is received, search bucket. If found, format as Bulk String: `$<len>\\r\\n<val>\\r\\n`. If not found, return `$-1\\r\\n`.',
          'Command INCR: Look up key, parse string as 64-bit integer, increment by 1, store back, return formatted integer response `:<val>\\r\\n`.'
        ],
        syscallsOrConcepts: ['Hash Tables', 'MurmurHash / SipHash', 'Collision Resolution'],
        checkpoint: '`redis-cli set name Alice` returns `OK`; `redis-cli get name` returns `"Alice"`.',
        manualHandCheck: 'Insert 50,000 keys and measure memory consumption.'
      },
      {
        step: 3,
        id: 'ttl-expiry',
        title: 'TTL Expiration & Passive/Active Eviction',
        goal: 'Support `EX` flag on SET (`SET key val EX 10`) and clean up expired keys.',
        specs: [
          'Record expiration timestamp: If command contains `EX <seconds>`, calculate absolute expiration time: `now_ms + (seconds * 1000)`. Store in expiration hash map.',
          'Passive eviction (Lazy): Whenever `GET <key>` is invoked, inspect expiration timestamp. If `now_ms > expire_at`, delete key from dictionary and return `$-1\\r\\n` (nil).',
          'Active eviction (Background daemon): Run a periodic timer every 100ms. Randomly sample 20 keys with TTLs. Evict all expired ones. If >25% of sampled keys were expired, repeat immediately to free memory.'
        ],
        syscallsOrConcepts: ['Min-Heap / Time Wheels', 'Active vs Passive Expiration', 'Clock Measurement'],
        checkpoint: 'Set key with 2s expiry; query after 3s; returns `nil`.',
        manualHandCheck: 'Verify that expired keys free their memory and do not cause leaks.'
      }
    ],
    theory: {
      highLevelArchitecture: 'Redis avoids multi-threaded locks by running all command executions sequentially on a single thread. Because all data is in RAM and operations take nanoseconds, it can process 100,000+ operations per second effortlessly.',
      mentalModel: 'A fast receptionist with a giant physical rolodex. They only talk to one person at a time, but because they can flip to any card in 1 millisecond, the line never stalls.',
      dataStructures: [
        {
          name: 'RESP Array Frame Layout',
          description: 'Standard encoding for a command like `SET foo bar`.',
          asciiDiagram: `
*3\\r\\n        --> Array with 3 elements
$3\\r\\nSET\\r\\n  --> Bulk string "SET"
$3\\r\\nfoo\\r\\n  --> Bulk string "foo"
$3\\r\\nbar\\r\\n  --> Bulk string "bar"`
        }
      ],
      keySyscalls: [
        { syscall: 'socket', signature: 'int socket(AF_INET, SOCK_STREAM, 0);', purpose: 'Listens on port 6379.' },
        { syscall: 'gettimeofday', signature: 'int gettimeofday(struct timeval *tv, struct timezone *tz);', purpose: 'Accurate TTL time comparisons.' }
      ],
      commonPitfalls: ['Blocking on slow clients: Always write non-blocking response buffers.'],
      visualizerType: 'redis'
    },
    hints: {
      level1_concept: 'RESP is human-readable and binary safe because lengths are explicit. Always read the length first, then read that exact number of bytes plus \\r\\n.',
      level2_architecture: 'Keep two hash tables: one for key-value pairs, and another for `key -> expire_timestamp`.',
      level3_codeSkeleton: `def parse_resp(reader):
    first_byte = reader.read(1)
    if first_byte == b'*':
        num_elements = int(reader.readline().strip())
        return [parse_resp(reader) for _ in range(num_elements)]
    elif first_byte == b'$':
        length = int(reader.readline().strip())
        data = reader.read(length)
        reader.read(2) # skip \\r\\n
        return data`
    },
    verification: {
      testScenarios: ['Run `redis-benchmark -t set,get -q` against your server.'],
      cliCommands: ['redis-cli -p 6379 PING', 'redis-cli -p 6379 SET msg "hello"', 'redis-cli -p 6379 GET msg'],
      edgeCasesToBreak: ['Querying a nonexistent key -> must return nil bulk string `$-1\\r\\n`.']
    }
  },
  {
    id: 'bittorrent-client',
    title: 'BitTorrent P2P Client & Piece Verifier',
    tagline: 'Download real torrent files by communicating with P2P swarms and verifying cryptographic pieces',
    badge: 'Peer-to-Peer Networks',
    difficulty: 'Advanced',
    estimatedHours: '25-35 hours',
    category: 'Peer-to-Peer Networks',
    shortDesc: 'Understand decentralized networking. Build a BitTorrent client from scratch: parse .torrent Bencode metadata, contact HTTP/UDP trackers, establish peer handshakes, and download piece blocks concurrently.',
    accentColor: {
      primary: 'sky',
      gradient: 'from-sky-500 to-cyan-500',
      badgeClass: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
      borderHover: 'hover:border-sky-500/50',
      glowShadow: 'rgba(14, 165, 233, 0.15)'
    },
    languages: [
      {
        name: 'Go',
        tag: 'Go',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
        why: 'Goroutines allow managing hundreds of peer connections with clean channels.',
        starterTip: 'Write a dedicated goroutine per connected peer socket.'
      },
      {
        name: 'Rust',
        tag: 'Rust',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
        why: 'Memory safety when dealing with binary bitfields and raw network buffers.',
        starterTip: 'Use `nom` or write a hand-rolled Bencode parser.'
      },
      {
        name: 'Python',
        tag: 'Python',
        badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        why: 'Fast prototyping with `socket` and `asyncio` to learn the protocol without boilerplate.',
        starterTip: 'Start with parsing the Bencode dictionary of a Debian ISO torrent.'
      }
    ],
    scope: {
      overview: 'BitTorrent is one of the most resilient distributed protocols ever invented. Instead of downloading a file from a central server, you download small 256KB-512KB pieces concurrently from hundreds of independent peers. In this project, you will download a real legal file (like a Linux ISO or open media) using your own handcrafted client.',
      whatYouWillBuild: [
        'A Bencode decoder and encoder parsing `.torrent` metainfo files',
        'Tracker client sending GET requests and parsing binary peer IP:Port lists',
        'BitTorrent peer wire handshake: `\\x13BitTorrent protocol` + 20-byte info_hash',
        'Choking, unchoking, and interested state machine',
        'Concurrent piece downloader with SHA-1 hash verification and file assembly'
      ],
      whatYouWontUse: ['NO libtorrent or existing torrent libraries', 'NO high-level torrent clients', 'NO AI generated code'],
      realWorldComparison: 'The distributed distribution engine powering software updates, Blizzard game patchers, and large dataset distribution.'
    },
    videoTour: {
      durationSeconds: 640,
      durationFormatted: '10:40',
      title: 'Full ~10-Min Video Tour: Building a BitTorrent P2P Client',
      overviewSummary: 'In this 10-minute visual walkthrough, explore how decentralized P2P swarms distribute files, step through Bencode decoding, contact real trackers, and watch concurrent 16KB blocks assemble and pass SHA-1 verification.',
      instructorName: 'Nadia P. (P2P Protocol Engineer)',
      masterclass: {
        youtubeId: 'jf_ddGnum_4',
        title: 'Implementing a BitTorrent Client in Rust from Scratch',
        author: 'Jon Gjengset (Distributed Systems Expert)',
        duration: '3h 15m',
        description: 'World-renowned live implementation: Bencode parsing, querying UDP/HTTP trackers, peer handshakes, and concurrent piece downloading.',
        tag: 'Full 3-Hour Masterclass'
      },
      playlist: [
        {
          youtubeId: 'jf_ddGnum_4',
          title: 'Implementing a BitTorrent Client in Rust from Scratch',
          author: 'Jon Gjengset (Distributed Systems Expert)',
          duration: '3h 15m',
          description: 'World-renowned live implementation: Bencode parsing, querying UDP/HTTP trackers, peer handshakes, and concurrent piece downloading.',
          tag: 'Full 3-Hour Masterclass'
        },
        {
          youtubeId: 'Kwej72EsVvM',
          title: 'I Built BitTorrent From Scratch in Rust (And It Actually Works)',
          author: 'Buildpkg',
          duration: '19:40',
          description: 'Hands-on architectural breakdown of a working BitTorrent client: torrent metadata, peer state machines, piece verification, and assembly.',
          tag: 'Hands-On Architecture'
        },
        {
          youtubeId: 'YlzvLc5UdXo',
          title: 'Make Your Own BitTorrent Client in 6 Minutes (Overview)',
          author: 'Manware',
          duration: '06:41',
          description: 'Fast-paced overview of every milestone required to write your own BitTorrent peer-to-peer download engine.',
          tag: 'Quickstart Synopsis'
        }
      ],
      chapters: [
        {
          timeSeconds: 0,
          timestamp: '00:00',
          title: 'Decentralized Swarms: How Files Are Sliced into Pieces',
          description: 'Why BitTorrent eliminated bandwidth bottlenecks by turning downloaders into uploaders.',
          subtitle: 'Welcome to peer-to-peer engineering! Today we are writing a client that connects directly to the global BitTorrent swarm.',
          scene: {
            type: 'overview',
            headline: 'Client-Server Bottleneck vs P2P Swarm Distribution',
            visualSnippet: 'Central Server: 10,000 users download from 1 server -> Network crashes\nBitTorrent:     Users trade 512KB pieces with each other -> Faster as swarm grows!',
            calloutText: 'Blizzard and Linux distributions use BitTorrent for multi-gigabyte releases.'
          }
        },
        {
          timeSeconds: 150,
          timestamp: '02:30',
          title: 'Bencode Parsing & The 20-Byte info_hash',
          description: 'Understanding Bencode strings, integers, lists, and extracting the raw info dictionary slice.',
          subtitle: 'A critical lesson: you must compute the SHA-1 of the exact raw bytes of the info dictionary without re-encoding.',
          scene: {
            type: 'architecture',
            headline: 'Bencode Metainfo Anatomy & Piece Hash Grid',
            visualSnippet: 'd8:announce41:http://tracker.debian.org/announce4:infod6:lengthi679477248e4:name14:debian-iso.iso12:piece lengthi524288e6:pieces13000:<binary_hashes>ee',
            calloutText: 'The 20-byte SHA-1 info_hash uniquely identifies the torrent swarm worldwide.'
          }
        },
        {
          timeSeconds: 295,
          timestamp: '04:55',
          title: 'Live Demo: Peer Handshake & Swarm Discovery',
          description: 'Connecting to a tracker, parsing compact binary peer IPs, and executing the 68-byte handshake.',
          subtitle: 'Watch as our client contacts the tracker, extracts 50 peer IP addresses, and receives an Unchoke message.',
          scene: {
            type: 'demo',
            headline: 'Tracker Announce & TCP Wire Handshake',
            visualSnippet: '$ python3 torrent.py debian.torrent\n[TRACKER] Contacted http://bttracker.debian.org:80/announce\n[PEERS] Discovered 48 active swarm seeders.\n[HANDSHAKE] Connected to 192.168.1.12:6881 -> Protocol: "BitTorrent protocol" (OK)\n[BITFIELD] Peer owns 100% of pieces. Sent interested. Received UNCHOKE!',
            calloutText: 'Confirms bidirectional peer wire communication.'
          }
        },
        {
          timeSeconds: 450,
          timestamp: '07:30',
          title: 'Code Walkthrough: Pipelined Block Requests & Assembly',
          description: 'Requesting 16KB chunks, handling choking states, and managing in-flight block queues.',
          subtitle: 'Because 512KB is too large for a single TCP packet, we pipeline five 16KB block requests simultaneously.',
          scene: {
            type: 'code',
            headline: 'Block Pipelining & Piece Buffer Assembly',
            visualSnippet: 'for offset in range(0, piece_len, 16384):\n    send_request(sock, piece_idx, offset, 16384)\n# When all blocks arrive:\nassert hashlib.sha1(piece_data).digest() == expected_hash\nfile.seek(piece_idx * piece_len)\nfile.write(piece_data)',
            calloutText: 'Validates cryptographic integrity before writing to disk.'
          }
        },
        {
          timeSeconds: 565,
          timestamp: '09:25',
          title: 'Cryptographic SHA-1 Verification & Wrap-Up',
          description: 'Preventing malicious data injection and assembling the final Linux ISO file.',
          subtitle: 'If a single byte is corrupt, the SHA-1 check fails, we discard the piece, and re-download from another peer.',
          scene: {
            type: 'benchmark',
            headline: 'Download Verification & Swarm Throughput',
            visualSnippet: 'Total Downloaded:   648.0 MB\nPieces Verified:    1,296 / 1,296 (100% SHA-1 Verified)\nCorrupted Pieces:   0 (Zero bad blocks)\nFinal File Hash:    sha256sum matches official release!',
            calloutText: 'You have built an industrial-grade peer-to-peer download engine.'
          }
        }
      ]
    },
    gettingStarted: {
      prerequisites: [
        'Python 3.8+ (or Go 1.21+ / Rust)',
        'A legal `.torrent` file (e.g. Ubuntu or Debian minimal ISO torrent)',
        'Active internet connection for tracker communication'
      ],
      projectStructure: `my_torrent/
├── bencode.py
├── tracker.py
├── peer.py
├── torrent.py
└── test.torrent`,
      visualArchitectureImage: {
        caption: 'BitTorrent P2P Swarm Pipeline: Tracker Discovery, Handshake, and Piece Verification',
        diagramType: 'Peer-to-Peer Swarm Topology',
        elements: [
          { id: '1', title: 'Bencode Parser', desc: 'Extracts tracker URL, piece length, and SHA-1 info_hash from .torrent metainfo.', color: 'sky', role: 'Metainfo Decoder' },
          { id: '2', title: 'Tracker Client', desc: 'Dispatches HTTP announce requests and decodes 6-byte compact peer IP:Port lists.', color: 'cyan', role: 'Peer Discovery' },
          { id: '3', title: 'Peer Wire Handshake', desc: 'Establishes 68-byte TCP connection and manages choking/unchoking state machines.', color: 'emerald', role: 'P2P Wire Protocol' },
          { id: '4', title: 'Piece SHA-1 Verifier', desc: 'Reassembles 16KB blocks into pieces, compares SHA-1 digests, and writes to disk.', color: 'purple', role: 'Integrity Engine' }
        ],
        connections: [
          'Read .torrent -> Bencode decoder extracts info_hash -> Announces to Tracker',
          'Tracker returns peer IP list -> Connect to Peer -> Execute 68-byte Handshake',
          'Peer unchokes -> Request 16KB blocks -> Verify SHA-1 -> Write verified piece to disk'
        ]
      },
      starterFileName: 'bencode_starter.py',
      starterLanguage: 'Python',
      starterCode: `import hashlib

def decode_bencode(data, idx=0):
    char = data[idx:idx+1]

    if char.isdigit():
        # String: <len>:<content>
        colon_idx = data.index(b':', idx)
        length = int(data[idx:colon_idx])
        start = colon_idx + 1
        end = start + length
        return data[start:end], end

    elif char == b'i':
        # Integer: i<num>e
        end_idx = data.index(b'e', idx)
        num = int(data[idx+1:end_idx])
        return num, end_idx + 1

    elif char == b'l':
        # List: l<items>e
        idx += 1
        items = []
        while data[idx:idx+1] != b'e':
            val, idx = decode_bencode(data, idx)
            items.append(val)
        return items, idx + 1

    elif char == b'd':
        # Dictionary: d<key><val>e
        idx += 1
        d = {}
        while data[idx:idx+1] != b'e':
            key, idx = decode_bencode(data, idx)
            val, idx = decode_bencode(data, idx)
            d[key.decode('utf-8', errors='ignore')] = val
        return d, idx + 1

    raise ValueError(f"Invalid bencode at byte {idx}: {char}")

def inspect_torrent(filepath):
    with open(filepath, 'rb') as f:
        raw_bytes = f.read()

    meta, _ = decode_bencode(raw_bytes)
    print("--- Torrent Metainfo ---")
    print(f"Announce Tracker URL: {meta.get('announce', b'').decode()}")
    info = meta.get('info', {})
    name = info.get('name', b'').decode()
    piece_len = info.get('piece length', 0)
    total_len = info.get('length', 0)
    pieces_bytes = info.get('pieces', b'')
    num_pieces = len(pieces_bytes) // 20

    print(f"Target File: {name}")
    print(f"Total Size: {total_len / (1024*1024):.2f} MB")
    print(f"Piece Length: {piece_len // 1024} KB")
    print(f"Total Pieces to Download: {num_pieces}")

if __name__ == '__main__':
    # Test with sample encoded string
    sample = b"d8:announce35:http://tracker.example.com/announce4:infod6:lengthi1048576e4:name10:sample.isoe"
    decoded, _ = decode_bencode(sample)
    print("Decoded Test Bencode Dictionary:")
    print(decoded)`,
      codeBreakdown: [
        { lines: 'Lines 6-12', concept: 'String Decoding', detail: 'Parses length prefix before colon and slices exact byte count.' },
        { lines: 'Lines 14-18', concept: 'Integer Decoding', detail: 'Parses signed decimal integers delimited by `i` and `e`.' },
        { lines: 'Lines 20-27', concept: 'List Parsing', detail: 'Recursively decodes items until encountering list terminator `e`.' },
        { lines: 'Lines 29-37', concept: 'Dictionary Parsing', detail: 'Extracts alternating bencoded keys and values until delimiter `e`.' }
      ],
      quickstartCommands: [
        'python3 bencode_starter.py',
        '# To inspect a real torrent file:\npython3 -c "import bencode_starter; bencode_starter.inspect_torrent(\'debian.torrent\')"'
      ],
      expectedOutput: `Decoded Test Bencode Dictionary:
{'announce': b'http://tracker.example.com/announce', 'info': {'length': 1048576, 'name': b'sample.iso'}}`
    },
    milestones: [
      {
        step: 1,
        id: 'bencode-parser',
        title: 'Bencode Parser & Torrent Info',
        goal: 'Decode Bencode strings, integers, lists, and dictionaries from `.torrent` files, extracting the 20-byte info hash.',
        specs: [
          'Parse Bencode Strings (`<length>:<contents>`): Read ASCII digits until the colon character `:`, parse as an integer `N`, then read exactly `N` raw bytes. For example: `4:spam` -> `b"spam"`.',
          'Parse Bencode Integers (`i<number>e`): Read character `i`, parse optional minus sign and decimal digits until delimiter `e`. Parse as a 64-bit integer. Reject invalid encodings like leading zeros (`i03e` is illegal).',
          'Parse Bencode Lists (`l<item1><item2>...e`): Read leading `l`, repeatedly invoke the parser recursively until encountering `e`. Return as an array.',
          'Parse Bencode Dictionaries (`d<key1><val1>...e`): Read leading `d`, repeatedly parse key-value pairs until `e`. All dictionary keys must be Bencode strings and must be sorted lexicographically.',
          'Extract raw info slice for SHA-1: Extract the exact raw byte slice of the `info` dictionary directly from the file buffer *without re-encoding* it. Compute its 20-byte SHA-1 digest to yield `info_hash`. Slicing the `pieces` string by 20 bytes yields the SHA-1 checksum for every piece in the file.'
        ],
        syscallsOrConcepts: ['Bencode Serialization', 'SHA-1 Digest Calculation', 'Recursive Descent Parsing', 'Lexicographical Sorting'],
        checkpoint: 'Your program prints the torrent file name, total size in megabytes, and total piece count.',
        manualHandCheck: 'Verify your calculated `info_hash` matches the hash shown in transmission or qBittorrent.'
      },
      {
        step: 2,
        id: 'tracker-peer-discovery',
        title: 'Tracker Announce & Compact Peer Discovery',
        goal: 'Send an HTTP announce request to the tracker URL and extract peer IP and port pairs.',
        specs: [
          'Generate client peer_id: Create a unique 20-byte peer ID: `-MC0001-` followed by 12 cryptographically random alphanumeric bytes.',
          'Construct URL-encoded announce query: URL-encode the 20-byte binary `info_hash` and `peer_id` (e.g. byte `0x12` becomes `%12`). Append query parameters: `port=6881&uploaded=0&downloaded=0&left=<file_length>&compact=1`.',
          'Send HTTP GET: Connect to the tracker hostname and send the GET request.',
          'Decode compact peer format: The tracker returns a Bencoded dictionary with key `peers`. In compact format, `peers` is a binary string where every 6 bytes represents one peer: the first 4 bytes are the IPv4 address (e.g. `[192, 168, 1, 10]`), and the last 2 bytes are the big-endian port number (`ntohs(*(uint16_t*)(p + 4))`). Parse all peers into an address list.'
        ],
        syscallsOrConcepts: ['HTTP Client over Sockets', 'URL Encoding of Binary Hashes', 'Compact Peer Lists (6-byte binary)', 'Big-Endian Ports'],
        checkpoint: 'Your program prints a list of 20+ active peer IP addresses discovered in the swarm.',
        manualHandCheck: 'Test with netcat: verify you can reach at least 3 peers on port 6881.'
      },
      {
        step: 3,
        id: 'peer-handshake',
        title: 'Peer Handshake & Wire Framing Protocol',
        goal: 'Establish TCP connection with a peer and complete the BitTorrent handshake.',
        specs: [
          'Establish TCP connection: Call `connect()` to a peer IP and port.',
          'Construct 68-byte handshake: Packet layout: `[1 byte: length 19][19 bytes: "BitTorrent protocol"][8 bytes: reserved zeros 0x00][20 bytes: binary info_hash][20 bytes: client peer_id]`.',
          'Validate peer response: Read 68 bytes from peer. Verify byte 0 is 19, bytes 1-19 match `"BitTorrent protocol"`, and the returned `info_hash` matches our expected hash.',
          'Frame message loop: After the handshake, all subsequent messages follow standard wire framing: `[4 bytes: big-endian payload_length][1 byte: message_id][optional payload]`. Handle Message ID 5 (Bitfield: bitmap of pieces the peer owns) and ID 1 (Unchoke: peer is ready to upload data to us!).'
        ],
        syscallsOrConcepts: ['Binary Wire Protocol', 'Bitfields', 'State Machine (Choked/Unchoked)', 'Handshake Validation'],
        checkpoint: 'Peer returns handshake and sends `unchoke` message (message ID 1).',
        manualHandCheck: 'Inspect incoming packets with Wireshark to verify valid peer framing.'
      },
      {
        step: 4,
        id: 'download-verify',
        title: 'Pipelined Block Download & SHA-1 Verification',
        goal: 'Request 16KB blocks, assemble full pieces, verify SHA-1 checksums, and write to disk.',
        specs: [
          'Divide pieces into blocks: A piece (e.g. 512KB) is divided into 16KB (16384-byte) blocks.',
          'Send Interested & Request: Send Message ID 2 (`interested`). Once unchoked, send Message ID 6 (`request`): `[4-byte piece_index][4-byte byte_offset][4-byte block_length]`.',
          'Pipelining: Maintain an in-flight window of 4-5 block requests concurrently to saturate network bandwidth.',
          'Assemble & Verify: Read Message ID 7 (`piece`), store the 16KB block at its respective offset. When all blocks for a piece have arrived, compute the 20-byte SHA-1 digest of the assembled piece buffer. Compare with expected hash from torrent info dictionary!',
          'Write to disk: If SHA-1 matches, write the verified piece directly to disk at `offset = piece_index * piece_length` using `pwrite()`. If hash mismatches, discard and re-request from a different peer.'
        ],
        syscallsOrConcepts: ['Block Pipelining', 'File I/O Seeking (pwrite)', 'Cryptographic Integrity Verification', 'SHA-1 Comparison'],
        checkpoint: 'Successfully download the complete file and verify its SHA-256 matches the official Linux ISO.',
        manualHandCheck: 'Intentionally corrupt 1 byte of a downloaded piece; ensure your client rejects and re-downloads it.'
      }
    ],
    theory: {
      highLevelArchitecture: 'A torrent file divides a large file into fixed-size pieces (e.g. 512KB). Each piece has a known SHA-1 hash listed in the torrent metainfo. A client connects to multiple peers simultaneously, asks each peer which pieces they possess (via bitfield), and downloads different pieces concurrently.',
      mentalModel: 'A puzzle where 100 people in a room each hold different puzzle pieces. You walk around trading and collecting pieces from whoever has the ones you are missing.',
      dataStructures: [
        {
          name: 'Peer Wire Message Header',
          description: 'Framing format for all BitTorrent peer communication.',
          asciiDiagram: `
+-------------------------------------------------------------+
| 4-byte Message Length | 1-byte Message ID | Payload Bytes   |
+-------------------------------------------------------------+`
        }
      ],
      keySyscalls: [
        { syscall: 'connect', signature: 'int connect(int sockfd, struct sockaddr *addr, ...);', purpose: 'Connects to peer TCP sockets.' },
        { syscall: 'pwrite', signature: 'ssize_t pwrite(int fd, void *buf, size_t count, off_t offset);', purpose: 'Writes verified pieces directly to disk offsets.' }
      ],
      commonPitfalls: ['Requesting too many blocks at once: Keep a pipeline window of 4-5 blocks per peer.'],
      visualizerType: 'torrent'
    },
    hints: {
      level1_concept: 'Pieces are too big to request in a single TCP message (usually 256KB-1MB). Break each piece into 16KB (16384 bytes) block requests!',
      level2_architecture: 'Keep a bitfield tracking which pieces you currently have, and update it as pieces pass SHA-1 verification.',
      level3_codeSkeleton: `def parse_handshake(sock, expected_info_hash):
    buf = sock.recv(68)
    pstrlen = buf[0]
    pstr = buf[1:20]
    info_hash = buf[28:48]
    assert pstr == b"BitTorrent protocol"
    assert info_hash == expected_info_hash
    return True`
    },
    verification: {
      testScenarios: ['Download an official Ubuntu or Arch Linux ISO torrent and verify `sha256sum iso_file`.'],
      cliCommands: ['go run main.go debian.torrent output.iso', 'sha256sum output.iso'],
      edgeCasesToBreak: ['A peer sends invalid blocks -> SHA-1 check must catch it, discard, and re-request from another peer.']
    }
  },
  {
    id: 'bytecode-vm',
    title: 'Toy Virtual Machine & Register Bytecode Interpreter',
    tagline: 'Understand how CPUs and runtimes execute code: registers, opcodes, and stack machines',
    badge: 'Virtual Machines & Compilers',
    difficulty: 'Intermediate',
    estimatedHours: '20-30 hours',
    category: 'Virtual Machines & Compilers',
    shortDesc: 'Demystify how the JVM, Python VM, or physical x86/ARM processors execute instructions. Build a register-based or stack-based Virtual Machine with a fetch-decode-execute loop, instruction decoder, and memory bus from scratch.',
    accentColor: {
      primary: 'purple',
      gradient: 'from-purple-500 to-indigo-500',
      badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      borderHover: 'hover:border-purple-500/50',
      glowShadow: 'rgba(168, 85, 247, 0.15)'
    },
    languages: [
      {
        name: 'C (C99)',
        tag: 'C',
        badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        why: 'Direct struct mapping to CPU registers and switch-case opcode dispatchers without overhead.',
        starterTip: 'Use a `uint16_t memory[65536]` array for 64KB RAM.'
      },
      {
        name: 'Rust',
        tag: 'Rust',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
        why: 'Pattern matching on opcodes makes the instruction decode cycle remarkably elegant.',
        starterTip: 'Represent opcodes as Rust enums with attached register operands.'
      },
      {
        name: 'TypeScript',
        tag: 'TypeScript',
        badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
        why: 'Great for building browser-based visual debuggers and step-through CPU inspectors.',
        starterTip: 'Use `Uint8Array` and `DataView` for raw binary instruction decoding.'
      }
    ],
    scope: {
      overview: 'How does a computer actually think? At the lowest level, all computation is a loop: fetch the instruction at the Program Counter, decode what opcode it is, execute the arithmetic or memory move, and advance the Program Counter. In this project, you will build a virtual CPU that executes custom bytecode programs.',
      whatYouWillBuild: [
        'A Virtual CPU with registers (R0-R7, PC, SP, FLAGS)',
        'A 64KB simulated RAM bus',
        'Instruction set architecture (ISA): `LOAD`, `STORE`, `ADD`, `SUB`, `JMP`, `JEQ`, `PUSH`, `POP`, `HALT`',
        'Binary assembler translating human assembly text into binary bytecode',
        'A working Fibonacci or Factorial program executing entirely on your virtual processor'
      ],
      whatYouWontUse: ['NO LLVM or existing VM runtimes', 'NO compiler frameworks', 'NO AI copilot assistance'],
      realWorldComparison: 'The foundational architecture behind the Java Virtual Machine (JVM), WebAssembly (Wasm), and CHIP-8 emulators.'
    },
    videoTour: {
      durationSeconds: 615,
      durationFormatted: '10:15',
      title: 'Full ~10-Min Video Tour: CPU Architecture & Bytecode Interpreter',
      overviewSummary: 'In this 10-minute visual walkthrough, step inside a physical computer processor: examine registers, watch the Program Counter advance through memory, step instructions one cycle at a time, and execute a complete Fibonacci program.',
      instructorName: 'Victor K. (Compiler Engineer)',
      masterclass: {
        youtubeId: '63juhla0ntE',
        title: 'Coding a Virtual Machine From Scratch in C',
        author: 'dr Jonas Birch (Low-Level Systems)',
        duration: '22:40',
        description: 'Hands-on architectural guide to building a stack-based virtual CPU in pure C: registers, instruction pointer (IP), and bytecode decoding.',
        tag: 'C Stack Machine Implementation'
      },
      playlist: [
        {
          youtubeId: '63juhla0ntE',
          title: 'Coding a Virtual Machine From Scratch in C',
          author: 'dr Jonas Birch (Low-Level Systems)',
          duration: '22:40',
          description: 'Hands-on architectural guide to building a stack-based virtual CPU in pure C: registers, instruction pointer (IP), and bytecode decoding.',
          tag: 'C Stack Machine Implementation'
        },
        {
          youtubeId: 'OjaAToVkoTw',
          title: 'How to Build a Virtual Machine & Stack Interpreter',
          author: 'Prof. Terence Parr (USF / Creator of ANTLR)',
          duration: '34:10',
          description: 'Legendary compiler professor Terence Parr breaks down the theory and design of bytecode interpreters, stack evaluation, and register architectures.',
          tag: 'Compiler & VM Theory'
        },
        {
          youtubeId: 'BNXP0w4Ppto',
          title: 'How to Build a Virtual Machine from Scratch (Part 1)',
          author: 'Philip Bohun',
          duration: '15:20',
          description: 'Step-by-step introduction to writing a simple virtual machine instruction set and executing stack instructions.',
          tag: 'Instruction Set Basics'
        }
      ],
      chapters: [
        {
          timeSeconds: 0,
          timestamp: '00:00',
          title: 'How CPUs Actually Think: The Fetch-Decode-Execute Cycle',
          description: 'Understanding that computers do not know if-statements or variables—only numbers representing opcodes.',
          subtitle: 'Welcome! Today we are building a processor. All computation in the universe comes down to this one continuous loop.',
          scene: {
            type: 'overview',
            headline: 'The Von Neumann Execution Loop',
            visualSnippet: '1. FETCH:  Read 32-bit instruction word at memory[PC]\n2. DECODE: Extract Opcode (8-bit) and Register Operands (4-bit)\n3. EXECUTE: Update Register File or Arithmetic Logic Unit (ALU)\n4. ADVANCE: PC = PC + 4 (Repeat billions of times per second!)',
            calloutText: 'x86, ARM, and WebAssembly all execute bytecode via this fundamental loop.'
          }
        },
        {
          timeSeconds: 135,
          timestamp: '02:15',
          title: 'Designing Our Instruction Set Architecture (ISA)',
          description: 'Encoding opcodes, register indexes, and 16-bit immediate values into 32-bit words.',
          subtitle: 'We pack our instructions into clean 32-bit words: 8 bits for the opcode, 4 bits each for source and destination registers.',
          scene: {
            type: 'architecture',
            headline: '32-Bit Instruction Word Encoding Layout',
            visualSnippet: 'Bits 24-31: Opcode (0x01 = LOAD_IMM, 0x02 = ADD, 0x03 = SUB, 0xFF = HALT)\nBits 20-23: Register Destination (R0 - R7)\nBits 16-19: Register Source (R0 - R7)\nBits 00-15: Immediate 16-bit Value (0 to 65535)',
            calloutText: 'Fixed 32-bit width makes decoding blazingly fast with simple bitshifts.'
          }
        },
        {
          timeSeconds: 270,
          timestamp: '04:30',
          title: 'Live Demo: Stepping Instructions & Computing Fibonacci',
          description: 'A live demo stepping cycle-by-cycle as registers R1 and R2 accumulate Fibonacci numbers.',
          subtitle: 'Watch as we step each instruction. Notice how register R3 accumulates the sum and the stack pointer adjusts.',
          scene: {
            type: 'demo',
            headline: 'Instruction Stepper & Register File Inspection',
            visualSnippet: '[PC: 0x00] LOAD_IMM R1, 1   -> R1=1\n[PC: 0x04] LOAD_IMM R2, 1   -> R2=1\n[PC: 0x08] ADD R1, R2, R3   -> R3=2 (ZF=0, SF=0)\n[PC: 0x0C] PUSH R3          -> SP=0xFEFC, memory[0xFEFC]=2\n[PC: 0x10] HALT             -> CPU Halted cleanly. Cycles: 5',
            calloutText: 'Shows hardware-level register and memory transitions.'
          }
        },
        {
          timeSeconds: 435,
          timestamp: '07:15',
          title: 'Code Walkthrough: Branching & The Call Stack',
          description: 'How conditional jumps inspect flags to implement loops, and how CALL/RET manage subroutines.',
          subtitle: 'Notice how if-statements are just conditional jumps. If the zero flag is set, we overwrite the Program Counter.',
          scene: {
            type: 'code',
            headline: 'ALU Flags & Branching Logic',
            visualSnippet: 'case OP_ADD:\n    cpu->regs[r1] = cpu->regs[r1] + cpu->regs[r2];\n    cpu->flags = (cpu->regs[r1] == 0) ? FLAG_ZERO : 0;\n    break;\ncase OP_JEQ:\n    if (cpu->flags & FLAG_ZERO) cpu->pc = imm;\n    break;',
            calloutText: 'Branching is nothing more than setting the PC to a target address.'
          }
        },
        {
          timeSeconds: 540,
          timestamp: '09:00',
          title: 'Building a Two-Pass Assembler & Final Wrap-Up',
          description: 'Translating human assembly code into binary bytecode and calculating label offsets.',
          subtitle: 'In Pass 1, we map label names to memory coordinates. In Pass 2, we emit the binary bytecode file.',
          scene: {
            type: 'benchmark',
            headline: 'Virtual Machine Performance Benchmark',
            visualSnippet: 'Instruction Rate: 28.4 Million Instructions / Sec (Single Core C99)\nMemory Footprint: 64 KB RAM total\nFibonacci(20):   6765 computed in 0.08 milliseconds!',
            calloutText: 'You now understand physical CPUs and virtual machines from first principles.'
          }
        }
      ]
    },
    gettingStarted: {
      prerequisites: [
        'C compiler (GCC/Clang) or Rust',
        'Make or shell build tools',
        'Standard terminal shell'
      ],
      projectStructure: `toy_vm/
├── Makefile
├── vm.h
├── vm.c
├── assembler.py
└── fibonacci.asm`,
      visualArchitectureImage: {
        caption: 'Von Neumann Virtual CPU Architecture: Register File, ALU, Stack, and Memory Bus',
        diagramType: 'CPU Hardware Block Diagram',
        elements: [
          { id: '1', title: 'Program Counter (PC)', desc: '16-bit pointer indicating current instruction memory address.', color: 'purple', role: 'Instruction Pointer' },
          { id: '2', title: 'Register File (R0 - R7)', desc: 'Fast 32-bit internal CPU storage holding arithmetic operands.', color: 'cyan', role: 'Registers' },
          { id: '3', title: 'Arithmetic Logic Unit (ALU)', desc: 'Executes ADD, SUB, MUL, and sets Zero Flag (ZF) & Sign Flag (SF).', color: 'emerald', role: 'ALU' },
          { id: '4', title: '64KB RAM Bus', desc: 'Combined memory space holding code segment, global data, and downward-growing stack.', color: 'amber', role: 'Memory Space' }
        ],
        connections: [
          'PC fetches 32-bit instruction from 64KB RAM Bus -> Decoder extracts Opcode',
          'ALU executes math on Register File -> Updates FLAGS register (ZF/SF)',
          'JMP/JEQ modifies PC -> PUSH/POP adjusts Stack Pointer (SP)'
        ]
      },
      starterFileName: 'vm_starter.c',
      starterLanguage: 'C',
      starterCode: `#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>

#define MEMORY_SIZE 65536

// Instruction Opcodes
#define OP_HALT     0x00
#define OP_LOAD_IMM 0x01
#define OP_ADD      0x02
#define OP_PRINT    0x03

typedef struct {
    uint32_t regs[8];
    uint16_t pc;
    uint16_t sp;
    bool running;
} cpu_t;

uint8_t memory[MEMORY_SIZE];

void init_cpu(cpu_t* cpu) {
    for (int i = 0; i < 8; i++) cpu->regs[i] = 0;
    cpu->pc = 0x0000;
    cpu->sp = 0xFF00;
    cpu->running = true;
}

void step_cpu(cpu_t* cpu) {
    if (!cpu->running) return;

    // Fetch 32-bit instruction word
    uint32_t inst = (memory[cpu->pc] << 24) |
                    (memory[cpu->pc + 1] << 16) |
                    (memory[cpu->pc + 2] << 8) |
                    (memory[cpu->pc + 3]);
    cpu->pc += 4;

    // Decode fields
    uint8_t opcode = (inst >> 24) & 0xFF;
    uint8_t reg_dest = (inst >> 20) & 0x0F;
    uint8_t reg_src  = (inst >> 16) & 0x0F;
    uint16_t imm     = inst & 0xFFFF;

    // Execute
    switch (opcode) {
        case OP_LOAD_IMM:
            cpu->regs[reg_dest] = imm;
            printf("[EXEC] LOAD_IMM R%d, %d\\n", reg_dest, imm);
            break;
        case OP_ADD:
            cpu->regs[reg_dest] = cpu->regs[reg_dest] + cpu->regs[reg_src];
            printf("[EXEC] ADD R%d, R%d -> R%d = %d\\n", reg_dest, reg_src, reg_dest, cpu->regs[reg_dest]);
            break;
        case OP_PRINT:
            printf("[STDOUT] R%d = %d\\n", reg_dest, cpu->regs[reg_dest]);
            break;
        case OP_HALT:
            cpu->running = false;
            printf("[EXEC] HALT. Execution complete.\\n");
            break;
        default:
            printf("[FAULT] Unknown opcode: 0x%02X at PC 0x%04X\\n", opcode, cpu->pc - 4);
            cpu->running = false;
            break;
    }
}

int main() {
    cpu_t cpu;
    init_cpu(&cpu);

    // Hardcode a 3-instruction test program into memory:
    // 1. LOAD_IMM R1, 15
    // 2. LOAD_IMM R2, 25
    // 3. ADD R1, R2
    // 4. PRINT R1
    // 5. HALT

    // Instruction 1: LOAD_IMM R1, 15 -> 0x01 0x10 0x00 0x0F
    memory[0] = OP_LOAD_IMM; memory[1] = 0x10; memory[2] = 0x00; memory[3] = 15;
    // Instruction 2: LOAD_IMM R2, 25 -> 0x01 0x20 0x00 0x19
    memory[4] = OP_LOAD_IMM; memory[5] = 0x20; memory[6] = 0x00; memory[7] = 25;
    // Instruction 3: ADD R1, R2 -> 0x02 0x12 0x00 0x00
    memory[8] = OP_ADD; memory[9] = 0x12; memory[10] = 0x00; memory[11] = 0x00;
    // Instruction 4: PRINT R1 -> 0x03 0x10 0x00 0x00
    memory[12] = OP_PRINT; memory[13] = 0x10; memory[14] = 0x00; memory[15] = 0x00;
    // Instruction 5: HALT -> 0x00 0x00 0x00 0x00
    memory[16] = OP_HALT;

    printf("--- Stepping Handcrafted Virtual CPU ---\\n");
    while (cpu.running) {
        step_cpu(&cpu);
    }
    printf("CPU state verified! Ready for Milestone 2.\\n");
    return 0;
}`,
      codeBreakdown: [
        { lines: 'Lines 13-19', concept: 'CPU State Struct', detail: 'Registers R0..R7, 16-bit Program Counter, and Stack Pointer.' },
        { lines: 'Lines 29-35', concept: 'Fetch & Advance PC', detail: 'Reads 4 bytes from memory into a 32-bit instruction word and increments PC by 4.' },
        { lines: 'Lines 37-41', concept: 'Instruction Decoder', detail: 'Extracts opcode and operand fields using bitmasking and shifts.' },
        { lines: 'Lines 43-65', concept: 'ALU & Opcode Dispatcher', detail: 'Executes `LOAD_IMM`, `ADD`, `PRINT`, and `HALT` operations.' }
      ],
      quickstartCommands: [
        'gcc -Wall -O2 vm_starter.c -o toy_vm',
        './toy_vm'
      ],
      expectedOutput: `--- Stepping Handcrafted Virtual CPU ---
[EXEC] LOAD_IMM R1, 15
[EXEC] LOAD_IMM R2, 25
[EXEC] ADD R1, R2 -> R1 = 40
[STDOUT] R1 = 40
[EXEC] HALT. Execution complete.
CPU state verified! Ready for Milestone 2.`
    },
    milestones: [
      {
        step: 1,
        id: 'cpu-registers',
        title: 'CPU State, Register File, & Memory Bus',
        goal: 'Define virtual CPU registers, flags, and 64KB addressable memory space.',
        specs: [
          'Declare CPU struct: Create `typedef struct { uint32_t regs[8]; uint16_t pc; uint16_t sp; uint8_t flags; bool running; } cpu_t;`. Registers `R0` through `R7` are general purpose.',
          'Define the memory bus: Allocate a 64KB array: `uint8_t memory[65536];`.',
          'Flags Register: Define bitmasks for CPU status flags: Zero Flag `ZF = 0x01` (set when arithmetic yields 0), Sign Flag `SF = 0x02` (set when result is negative).',
          'Initialize pointers: Initialize Program Counter `pc = 0x0000` (code segment start) and Stack Pointer `sp = 0xFF00` (top of addressable stack memory).'
        ],
        syscallsOrConcepts: ['Register File', 'Von Neumann Architecture', 'Memory-Mapped I/O', 'Flags Register'],
        checkpoint: 'CPU struct initializes cleanly and can read/write memory addresses without errors.',
        manualHandCheck: 'Assert that memory read out of bounds (beyond 64KB) triggers a CPU fault.'
      },
      {
        step: 2,
        id: 'instruction-decoder',
        title: 'Fetch-Decode-Execute Loop & ALU Operations',
        goal: 'Implement the central CPU execution loop decoding 32-bit instructions.',
        specs: [
          'Design 32-bit Instruction Encoding: Encode instructions as: `[8-bit Opcode][4-bit RegDest][4-bit RegSrc][16-bit Immediate]`.',
          'Fetch: Read 4 bytes from `memory[pc]`, then advance `pc += 4`.',
          'Decode: Extract opcode with `(inst >> 24) & 0xFF`, `reg1 = (inst >> 20) & 0x0F`, `reg2 = (inst >> 16) & 0x0F`, `imm = inst & 0xFFFF`.',
          'Execute ALU operations: Case `0x01` (`LOAD_IMM`): `cpu->regs[reg1] = imm;`. Case `0x02` (`ADD`): `cpu->regs[reg1] = cpu->regs[reg1] + cpu->regs[reg2];`, update Zero Flag if result == 0. Case `0x03` (`SUB`): `cpu->regs[reg1] = cpu->regs[reg1] - cpu->regs[reg2];`, update Sign Flag if result < 0. Case `0xFF` (`HALT`): set `running = false`.'
        ],
        syscallsOrConcepts: ['Instruction Decoding', 'Bitmasking & Bitshifts', 'ALU (Arithmetic Logic Unit)', 'Fetch-Decode-Execute'],
        checkpoint: 'Executing an instruction `ADD R1, R2` correctly updates R1 and flags.',
        manualHandCheck: 'Verify that subtracting equal numbers sets the Zero Flag (`ZF = 1`).'
      },
      {
        step: 3,
        id: 'branching-stack',
        title: 'Branching, Loops & Call Stack',
        goal: 'Enable conditional jumps (`JMP`, `JEQ`, `JNE`) and subroutines (`CALL`, `RET`).',
        specs: [
          'Unconditional Jump `JMP <addr>`: Modify Program Counter directly: `cpu->pc = addr;`.',
          'Conditional Jump `JEQ <addr>`: Check if Zero Flag is set: `if (cpu->flags & ZF) cpu->pc = addr;`.',
          'Stack operations: `PUSH <reg>`: Decrement `sp -= 4`, write `*(uint32_t*)&memory[sp] = cpu->regs[reg]`. `POP <reg>`: Read `cpu->regs[reg] = *(uint32_t*)&memory[sp]`, increment `sp += 4`.',
          'Subroutine `CALL <addr>`: Push `pc` onto stack, then set `pc = addr`. Subroutine `RET`: Pop return address from stack and set `pc = return_addr`.'
        ],
        syscallsOrConcepts: ['Control Flow', 'Call Stack & Stack Frames', 'Subroutines', 'Program Counter Manipulation'],
        checkpoint: 'A loop counter successfully counts from 10 down to 0 and halts.',
        manualHandCheck: 'Step through recursive function calls; ensure stack pointer correctly tracks depth.'
      },
      {
        step: 4,
        id: 'assembler-fibonacci',
        title: 'Mini Assembler & Fibonacci Program',
        goal: 'Write a small assembler converting assembly text into bytecode and run Fibonacci.',
        specs: [
          'Tokenizer: Read lines of text: e.g. `LOAD_IMM R1, 15`.',
          'Symbol Table (Two-Pass): Pass 1 scans for label declarations (e.g. `loop:`) and records their memory offsets. Pass 2 resolves label names into exact 16-bit address offsets.',
          'Binary Emitter: Pack opcode, register numbers, and immediate into 32-bit big-endian words and write out to `program.bin`.',
          'Execute Fibonacci: Load `program.bin` into VM memory starting at address `0x0000`. Run the VM until `HALT`. Verify that memory address `0x1000` contains the 10th Fibonacci number (55).'
        ],
        syscallsOrConcepts: ['Assembler Two-Pass Resolution', 'Symbol Tables', 'Binary Encoding', 'Bytecode Verification'],
        checkpoint: 'Your virtual CPU prints the correct Fibonacci sequence up to 55 and halts cleanly.',
        manualHandCheck: 'Benchmark how many millions of instructions per second (MIPS) your VM achieves.'
      }
    ],
    theory: {
      highLevelArchitecture: 'A CPU does not know what a variable, a function, or an if-statement is. It only knows instructions: numbers representing opcodes. The fetch-decode-execute loop cycles billions of times per second to move bits between registers and memory.',
      mentalModel: 'A clock ticking continuously. On each tick, you read the page number on your index finger (PC), read the recipe instruction (Opcode), adjust your kitchen scales (Registers), and turn to the next page.',
      dataStructures: [
        {
          name: '32-Bit Instruction Encoding Format',
          description: 'Packed instruction word decoded by the CPU.',
          asciiDiagram: `
 0      7 8    11 12   15 16                          31
+--------+-------+-------+------------------------------+
| Opcode |  RegA |  RegB |    Immediate 16-bit Value    |
+--------+-------+-------+------------------------------+`
        }
      ],
      keySyscalls: [
        { syscall: 'none (bare metal)', signature: 'void cpu_step(cpu_t *cpu);', purpose: 'Self-contained algorithmic execution loop.' }
      ],
      commonPitfalls: ['Stack overflow: Ensure stack operations check if SP exceeds allocated bounds.'],
      visualizerType: 'vm'
    },
    hints: {
      level1_concept: 'All control flow (if/else, while, for) is just conditional jumps (JMP) modifying the Program Counter (PC).',
      level2_architecture: 'Keep instructions fixed-size (e.g. 32-bit / 4 bytes) for your first CPU; it makes PC incrementing trivially `PC += 4`.',
      level3_codeSkeleton: `void step_cpu(cpu_t* cpu) {
    uint32_t inst = cpu->memory[cpu->pc++];
    uint8_t opcode = (inst >> 24) & 0xFF;
    uint8_t r1 = (inst >> 20) & 0x0F;
    uint8_t r2 = (inst >> 16) & 0x0F;
    int16_t imm = inst & 0xFFFF;
    switch(opcode) {
        case OP_ADD: cpu->regs[r1] += cpu->regs[r2]; break;
        case OP_LOAD_IMM: cpu->regs[r1] = imm; break;
        case OP_HALT: cpu->running = false; break;
    }
}`
    },
    verification: {
      testScenarios: ['Execute a factorial program computing 5! = 120.'],
      cliCommands: ['gcc -O3 vm.c -o my_vm', './my_vm fibonacci.bin'],
      edgeCasesToBreak: ['Division by zero instruction -> CPU must trigger an interrupt / trap exception without crashing.']
    }
  },
  {
    id: 'collaborative-canvas',
    title: 'Real-Time Collaborative Canvas (WebSockets from Scratch)',
    tagline: 'Build a live multi-user shared drawing canvas using low-level RFC 6455 WebSockets',
    badge: 'Real-Time Systems',
    difficulty: 'Intermediate',
    estimatedHours: '20-25 hours',
    category: 'Real-Time Collaboration',
    shortDesc: 'Understand how Figma, Miro, and Google Docs sync cursors in real time. Implement an RFC 6455 WebSocket server from scratch over raw TCP, complete the Sec-WebSocket-Key SHA-1 handshake, parse masked frames, and broadcast strokes.',
    accentColor: {
      primary: 'teal',
      gradient: 'from-teal-500 to-emerald-500',
      badgeClass: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
      borderHover: 'hover:border-teal-500/50',
      glowShadow: 'rgba(20, 184, 166, 0.15)'
    },
    languages: [
      {
        name: 'Node.js (No ws package)',
        tag: 'Node.js',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        why: 'Use raw `net.createServer` to prove you can build WebSockets without the popular `ws` or `socket.io` npm packages.',
        starterTip: 'Use `crypto.createHash("sha1")` and `Buffer` for client mask XOR operations.'
      },
      {
        name: 'Go',
        tag: 'Go',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
        why: 'High-performance binary framing and concurrent peer broadcasts using goroutines.',
        starterTip: 'Inspect raw HTTP upgrade request headers with standard library `net/http` or raw `net.Conn`.'
      },
      {
        name: 'Rust',
        tag: 'Rust',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
        why: 'Zero-copy binary frame decoding and multi-client cursor state broadcasting.',
        starterTip: 'Implement the WebSocket masking formula: `byte[i] ^ mask[i % 4]`.'
      }
    ],
    scope: {
      overview: 'WebSockets allow full-duplex, bi-directional communication between browser and server without HTTP polling overhead. But under the hood, how does an HTTP connection upgrade into a persistent binary TCP stream? In this project, you will build an RFC 6455 WebSocket server from scratch and connect standard browser `new WebSocket("ws://...")` clients to it!',
      whatYouWillBuild: [
        'HTTP to WebSocket upgrade handshake: hashing `Sec-WebSocket-Key` with the magic GUID `258EAFA5-E914-47DA-95CA-C5AB0DC85B11`',
        'RFC 6455 binary frame decoder: FIN bit, opcode (0x1 Text, 0x2 Binary, 0x8 Close, 0x9 Ping)',
        'XOR unmasking algorithm: unmasking client payloads with 4-byte masking keys',
        'Multi-client room broadcast: relaying drawing strokes and cursor coordinates to all peers in < 2ms',
        'Frontend drawing canvas displaying multi-user cursors with unique colors'
      ],
      whatYouWontUse: ['NO Socket.io or ws package', 'NO Firebase or cloud sync', 'NO AI copilot assistance'],
      realWorldComparison: 'The low-level foundation behind Figma multiplayer, Google Docs, multiplayer browser games, and Discord voice signaling.'
    },
    videoTour: {
      durationSeconds: 620,
      durationFormatted: '10:20',
      title: 'Full ~10-Min Video Tour: Real-Time WebSockets & Multiplayer Sync',
      overviewSummary: 'In this 10-minute visual walkthrough, discover how Figma and Miro synchronize drawing strokes with sub-millisecond latency, implement the RFC 6455 SHA-1 handshake with the magic GUID, and unmask incoming client binary frames.',
      instructorName: 'Maya L. (Real-Time Systems Architect)',
      masterclass: {
        youtubeId: 'qFoFKLI3O8w',
        title: 'Implementing the WebSocket Protocol with JavaScript from Scratch',
        author: 'Erick Wendel',
        duration: '24:50',
        description: 'Direct step-by-step code solution: raw TCP socket bootstrap, RFC 6455 GUID handshake, and binary frame XOR unmasking from complete scratch.',
        tag: 'Solution Code: RFC 6455'
      },
      playlist: [
        {
          youtubeId: '2Nt-ZrNP22A',
          title: 'WebSockets Crash Course - Handshake, Framing & Protocol Architecture',
          author: 'Hussein Nasser (Software Architecture)',
          duration: '21:10',
          description: 'Comprehensive breakdown of raw WebSockets: RFC 6455 HTTP upgrade handshake, Sec-WebSocket-Accept GUID hashing, and frame unmasking.',
          tag: 'RFC 6455 Protocol Architecture'
        },
        {
          youtubeId: 'qFoFKLI3O8w',
          title: 'Implementing the WebSocket Protocol with JavaScript from Scratch',
          author: 'Erick Wendel',
          duration: '24:50',
          description: 'Zero-dependency implementation: creating raw TCP sockets, handling the cryptographic handshake, and decoding binary frames.',
          tag: 'Hands-On Zero-Dependency Code'
        },
        {
          youtubeId: 'rc_zVASAajU',
          title: 'I Wrote WebSockets "From Scratch" (RFC 6455 Byte Inspection)',
          author: 'Systems Engineer',
          duration: '16:15',
          description: 'Inspecting every bit in WebSocket frames: FIN bit, RSV bits, Opcode, MASK bit, payload length, masking key, and payload data.',
          tag: 'Bitwise Frame Inspection'
        }
      ],
      chapters: [
        {
          timeSeconds: 0,
          timestamp: '00:00',
          title: 'The Real-Time Web: Escaping HTTP Polling',
          description: 'Why HTTP request-response overhead is too slow for multiplayer whiteboards and gaming.',
          subtitle: 'Welcome! Today we are building a multiplayer collaborative whiteboard using raw RFC 6455 WebSockets.',
          scene: {
            type: 'overview',
            headline: 'HTTP Request Polling vs Persistent WebSocket Stream',
            visualSnippet: 'HTTP Polling: Browser sends 1KB header every 100ms -> Massive overhead, high latency\nWebSocket:    Single handshake -> Persistent bi-directional TCP stream (2-byte header!)',
            calloutText: 'Powers Figma multiplayer, Slack live chat, and multiplayer browser gaming.'
          }
        },
        {
          timeSeconds: 145,
          timestamp: '02:25',
          title: 'The RFC 6455 Upgrade Handshake & The Magic GUID',
          description: 'How an HTTP GET request transforms into a raw WebSocket connection via SHA-1 hashing.',
          subtitle: 'When the browser sends Sec-WebSocket-Key, we concatenate it with the RFC magic GUID and return status 101.',
          scene: {
            type: 'architecture',
            headline: 'The RFC 6455 Handshake Protocol',
            visualSnippet: 'Client Request:  GET /chat HTTP/1.1\\r\\nUpgrade: websocket\\r\\nSec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\\r\\n\nMagic GUID:      258EAFA5-E914-47DA-95CA-C5AB0DC85B11\nServer Response: HTTP/1.1 101 Switching Protocols\\r\\nSec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=\\r\\n\\r\\n',
            calloutText: 'The connection remains open and transitions from HTTP text to binary frames.'
          }
        },
        {
          timeSeconds: 280,
          timestamp: '04:40',
          title: 'Live Demo: Multi-Browser Collaborative Whiteboard',
          description: 'Two browser windows drawing strokes and syncing cursors with sub-2ms latency.',
          subtitle: 'Watch as we draw a circle in Chrome on the left; Firefox on the right renders the stroke in 1.4 milliseconds.',
          scene: {
            type: 'demo',
            headline: 'Two Browser Clients Drawing Simultaneously',
            visualSnippet: '[WS SERVER] Upgraded client #1 (Alice) to WebSocket\n[WS SERVER] Upgraded client #2 (Bob) to WebSocket\n[FRAME] Client #1 sent 12-byte draw stroke: { x: 140, y: 88, color: #06B6D4 }\n[BROADCAST] Fanout to Client #2 in 0.42 ms (Zero dropped packets)',
            calloutText: 'Sub-millisecond latency provides butter-smooth real-time multiplayer feel.'
          }
        },
        {
          timeSeconds: 430,
          timestamp: '07:10',
          title: 'Code Walkthrough: The XOR Unmasking Algorithm',
          description: 'Why RFC 6455 requires client-to-server masking and how the bitwise XOR formula works.',
          subtitle: 'Client frames must be masked to prevent cache poisoning on proxy servers. We unmask using a 4-byte key.',
          scene: {
            type: 'code',
            headline: 'Bitwise Mask Decoding Formula',
            visualSnippet: 'for (let i = 0; i < payload.length; i++) {\n    unmasked[i] = payload[i] ^ mask_key[i % 4];\n}\n// Server-to-client frames MUST NOT be masked!',
            calloutText: 'Critical RFC rule: servers must never mask frames sent to clients.'
          }
        },
        {
          timeSeconds: 545,
          timestamp: '09:05',
          title: 'Broadcast Fanout & Wrap-Up',
          description: 'Managing peer sets, handling clean TCP disconnections, and final conclusions.',
          subtitle: 'Notice how cleanly we can maintain connected client sockets in a Set and broadcast in parallel.',
          scene: {
            type: 'benchmark',
            headline: 'Multiplayer Performance Benchmark',
            visualSnippet: 'Active Connected Browsers: 50 clients\nDraw Events Dispatched:    2,400 strokes/second\nRound-Trip Latency:        1.2 milliseconds\nExternal Dependencies:     0 (Pure Node.js net module)',
            calloutText: 'You now possess the foundational knowledge to build multiplayer canvas engines.'
          }
        }
      ]
    },
    gettingStarted: {
      prerequisites: [
        'Node.js 18+ (strictly without `ws` or `socket.io` packages)',
        'Modern browser (Chrome/Firefox/Safari) supporting HTML5 Canvas',
        'Standard terminal shell'
      ],
      projectStructure: `collab_canvas/
├── server.js
├── index.html
└── canvas.js`,
      visualArchitectureImage: {
        caption: 'WebSocket Multiplayer Architecture: RFC 6455 Handshake, XOR Demasking, and Broadcast Fanout',
        diagramType: 'Real-Time Bi-Directional Pipeline',
        elements: [
          { id: '1', title: 'HTTP Upgrade Gateway', desc: 'Accepts GET request with Upgrade: websocket and returns 101 Switching Protocols.', color: 'teal', role: 'Handshake' },
          { id: '2', title: 'RFC 6455 Frame Unmasker', desc: 'Extracts 4-byte mask key and decodes payload with byte[i] ^ mask[i % 4].', color: 'cyan', role: 'Binary Framing' },
          { id: '3', title: 'Broadcast Fanout Hub', desc: 'Maintains connected client list and writes unmasked frames to all other peers.', color: 'emerald', role: 'Fanout' },
          { id: '4', title: 'HTML5 Canvas Client', desc: 'Captures mouse drag coordinates and renders multi-user cursor tags.', color: 'purple', role: 'Frontend UI' }
        ],
        connections: [
          'Browser sends new WebSocket("ws://...") -> Server verifies Key -> Returns 101 Response',
          'User draws on Canvas -> Browser masks and sends 0x2 Binary Frame',
          'Server unmasks frame -> Broadcasts to all other connected peers in < 2ms'
        ]
      },
      starterFileName: 'websocket_starter.js',
      starterLanguage: 'JavaScript (Node.js)',
      starterCode: `const net = require('net');
const crypto = require('crypto');

const MAGIC_GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const PORT = 8080;
const clients = new Set();

const server = net.createServer((socket) => {
    let isUpgraded = false;

    socket.on('data', (buffer) => {
        if (!isUpgraded) {
            // Step 1: Parse HTTP Handshake Request
            const request = buffer.toString();
            const keyMatch = request.match(/Sec-WebSocket-Key: (.+)\\r\\n/);

            if (keyMatch) {
                const key = keyMatch[1].trim();
                // Compute SHA-1 digest and Base64 encode
                const acceptKey = crypto
                    .createHash('sha1')
                    .update(key + MAGIC_GUID)
                    .digest('base64');

                const response = 
                    'HTTP/1.1 101 Switching Protocols\\r\\n' +
                    'Upgrade: websocket\\r\\n' +
                    'Connection: Upgrade\\r\\n' +
                    'Sec-WebSocket-Accept: ' + acceptKey + '\\r\\n\\r\\n';

                socket.write(response);
                isUpgraded = true;
                clients.add(socket);
                console.log('[WEBSOCKET] Client upgraded successfully! Total connected:', clients.size);
            }
        } else {
            // Step 2: Decode RFC 6455 Frame
            const firstByte = buffer[0];
            const opcode = firstByte & 0x0F;

            if (opcode === 0x8) {
                // Connection Close Frame
                socket.end();
                return;
            }

            const isMasked = (buffer[1] & 0x80) !== 0;
            let payloadLen = buffer[1] & 0x7F;
            let offset = 2;

            if (payloadLen === 126) {
                payloadLen = buffer.readUInt16BE(2);
                offset = 4;
            }

            if (isMasked) {
                const maskKey = buffer.slice(offset, offset + 4);
                offset += 4;
                const payload = buffer.slice(offset, offset + payloadLen);

                // XOR Unmasking
                const unmasked = Buffer.alloc(payloadLen);
                for (let i = 0; i < payloadLen; i++) {
                    unmasked[i] = payload[i] ^ maskKey[i % 4];
                }

                console.log('[MESSAGE RECEIVED]:', unmasked.toString());

                // Step 3: Broadcast to other clients (Unmasked server frame)
                const outHeader = Buffer.from([0x81, unmasked.length]);
                const outFrame = Buffer.concat([outHeader, unmasked]);

                for (const client of clients) {
                    if (client !== socket && client.writable) {
                        client.write(outFrame);
                    }
                }
            }
        }
    });

    socket.on('close', () => {
        clients.delete(socket);
        console.log('[WEBSOCKET] Client disconnected. Remaining:', clients.size);
    });
});

server.listen(PORT, () => {
    console.log(\`[SERVER] Handcrafted WebSocket Server listening on ws://localhost:\${PORT}\`);
    console.log('[HINT] Open browser console and test with: new WebSocket("ws://localhost:8080")');
});`,
      codeBreakdown: [
        { lines: 'Lines 15-28', concept: 'RFC 6455 Handshake & GUID', detail: 'Concatenates `Sec-WebSocket-Key` with the magic GUID, computes SHA-1, and sends status 101.' },
        { lines: 'Lines 39-51', concept: 'Binary Frame Header Parsing', detail: 'Extracts FIN bit, opcode, mask bit, and handles 7-bit or 16-bit payload length.' },
        { lines: 'Lines 57-62', concept: 'XOR Unmasking Algorithm', detail: 'Decodes payload bytes using the 4-byte client mask key.' },
        { lines: 'Lines 67-73', concept: 'Multi-Client Broadcast Fanout', detail: 'Constructs an unmasked server frame (`0x81` + length + payload) and writes to peers.' }
      ],
      quickstartCommands: [
        'node websocket_starter.js',
        '# In Chrome / Firefox DevTools Console:\nconst ws = new WebSocket("ws://localhost:8080");\nws.onopen = () => ws.send("Hello Handcrafted WebSockets!");\nws.onmessage = (e) => console.log("Received:", e.data);'
      ],
      expectedOutput: `[SERVER] Handcrafted WebSocket Server listening on ws://localhost:8080
[HINT] Open browser console and test with: new WebSocket("ws://localhost:8080")
[WEBSOCKET] Client upgraded successfully! Total connected: 1
[MESSAGE RECEIVED]: Hello Handcrafted WebSockets!`
    },
    milestones: [
      {
        step: 1,
        id: 'ws-handshake',
        title: 'RFC 6455 Upgrade Handshake',
        goal: 'Accept an incoming HTTP request and complete the WebSocket switching protocols handshake.',
        specs: [
          'Listen on TCP port 8080: Accept incoming connection and parse the HTTP GET request header.',
          'Extract Sec-WebSocket-Key: Scan headers for `Sec-WebSocket-Key: <key>`. Extract the 24-character Base64 key string.',
          'Concatenate Magic GUID: Append the exact RFC 6455 GUID string: `key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"`.',
          'Compute SHA-1 & Base64: Calculate the 20-byte binary SHA-1 digest of the concatenated string. Then Base64-encode the 20 binary bytes to yield `Sec-WebSocket-Accept`.',
          'Send 101 Response: Respond with `HTTP/1.1 101 Switching Protocols\\r\\nUpgrade: websocket\\r\\nConnection: Upgrade\\r\\nSec-WebSocket-Accept: <computed_key>\\r\\n\\r\\n`. Keep the TCP socket open!'
        ],
        syscallsOrConcepts: ['RFC 6455 Handshake', 'SHA-1 & Base64', 'Protocol Upgrade', 'Persistent TCP Sockets'],
        checkpoint: 'A browser running `new WebSocket("ws://localhost:8080")` successfully fires the `onopen` event!',
        manualHandCheck: 'Verify in Chrome DevTools Network tab that status code is `101 Web Socket Protocol Handshake`.'
      },
      {
        step: 2,
        id: 'frame-unmasking',
        title: 'Binary Frame Parsing & XOR Unmasking',
        goal: 'Decode incoming WebSocket frames and apply the XOR masking key.',
        specs: [
          'Parse Byte 0: Extract `FIN` flag (`(byte[0] & 0x80) != 0`) and `Opcode` (`byte[0] & 0x0F`). Opcode `0x1` = Text, `0x2` = Binary, `0x8` = Connection Close, `0x9` = Ping.',
          'Parse Byte 1: Extract `MASK` bit (`(byte[1] & 0x80) != 0`). RFC 6455 mandates that all client-to-server frames MUST be masked. If MASK == 0, abort with protocol error.',
          'Extract Payload Length: Read lower 7 bits `len = byte[1] & 0x7F`. If `len <= 125`, length is `len`. If `len == 126`, read next 2 bytes as 16-bit big-endian integer. If `len == 127`, read next 8 bytes as 64-bit integer.',
          'Extract 4-Byte Masking Key: Read the next 4 bytes: `uint8_t mask_key[4]`.',
          'XOR Unmasking: For each byte in the payload at index `i`, decode original byte using: `decoded[i] = masked_byte[i] ^ mask_key[i % 4];`.'
        ],
        syscallsOrConcepts: ['Bitwise XOR', 'Frame Demultiplexing', 'Binary Masking', 'RFC 6455 Framing'],
        checkpoint: 'Sending `ws.send("Hello")` from browser logs `"Hello"` on server terminal.',
        manualHandCheck: 'Verify why client-to-server frames are masked: to prevent cache poisoning on intermediary HTTP proxies.'
      },
      {
        step: 3,
        id: 'canvas-sync',
        title: 'Collaborative Drawing & Cursor Broadcast',
        goal: 'Broadcast cursor coordinates and drawing vectors to all connected peer browsers.',
        specs: [
          'Maintain Client Registry: Store active connected WebSocket client sockets in a Set or Array.',
          'Construct Outgoing Server Frame: Server-to-client frames MUST NOT be masked! Byte 0: `0x82` (FIN=1, Opcode=0x2 Binary) or `0x81` (Text). Byte 1: Payload length without mask bit. Followed immediately by raw payload bytes.',
          'Broadcast Fanout: When Client A sends a draw stroke `{ x, y, color }`, parse the frame, wrap into a server frame, and loop through all other connected clients writing the frame to their sockets.',
          'Handle Disconnects & Pings: On receiving Opcode `0x8` (Close), gracefully close the client socket and remove from client registry. On Opcode `0x9` (Ping), immediately respond with Opcode `0xA` (Pong).'
        ],
        syscallsOrConcepts: ['HTML5 Canvas API', 'Broadcast Fanout', 'Latency Profiling', 'Ping/Pong Keep-Alive'],
        checkpoint: 'Open two browser tabs side-by-side; drawing in Tab 1 renders smoothly in Tab 2 in real time.',
        manualHandCheck: 'Measure round-trip time: latency should be under 5 milliseconds on local loopback.'
      }
    ],
    theory: {
      highLevelArchitecture: 'WebSockets start as a standard HTTP/1.1 GET request with an `Upgrade: websocket` header. Once the server returns `101 Switching Protocols`, both sides stop talking HTTP and start communicating via lightweight binary frames with only 2 to 10 bytes of header overhead.',
      mentalModel: 'A phone call that starts with an operator asking for your account ID (HTTP Handshake), and once verified, puts you through directly to a dedicated open audio line (Raw WebSocket stream).',
      dataStructures: [
        {
          name: 'RFC 6455 Frame Header',
          description: 'Structure of a single WebSocket frame.',
          asciiDiagram: `
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
|N|V|V|V|       |S|             |   (if payload len==126/127)   |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
|     Masking-key (4 bytes, only if MASK==1, from client)       |
+---------------------------------------------------------------+`
        }
      ],
      keySyscalls: [
        { syscall: 'crypto', signature: 'sha1(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11")', purpose: 'Generates handshake accept header.' }
      ],
      commonPitfalls: ['Masking server-to-client frames: RFC 6455 strictly forbids servers from masking frames sent to browsers.'],
      visualizerType: 'canvas'
    },
    hints: {
      level1_concept: 'The handshake is just an HTTP response with status code 101. Once you send that response, DO NOT close the socket! Keep it open and start reading WebSocket binary frames.',
      level2_architecture: 'Store connected clients in a Set or Array. When a draw event arrives, loop through all clients and write the unmasked frame out to every client except the sender.',
      level3_codeSkeleton: `function unmask(payload, maskKey) {
    const result = Buffer.alloc(payload.length);
    for (let i = 0; i < payload.length; i++) {
        result[i] = payload[i] ^ maskKey[i % 4];
    }
    return result;
}`
    },
    verification: {
      testScenarios: ['Open 3 browser tabs simultaneously, draw circles in each, and verify all tabs stay in sync.'],
      cliCommands: ['node server.js', 'open index.html'],
      edgeCasesToBreak: ['Closing a tab abruptly -> server must detect socket EOF or close frame (0x8) and cleanly reap client.']
    }
  }
];
