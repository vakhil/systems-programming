import { Project } from '../types';

export const PROJECTS_DATA_BASE: Project[] = [
  {
    id: 'memory-allocator',
    title: 'Custom Heap Memory Allocator',
    tagline: 'Craft your own malloc(), free(), and realloc() using direct Linux/POSIX virtual memory syscalls',
    badge: 'Virtual Memory',
    difficulty: 'Advanced',
    estimatedHours: '20-30 hours',
    category: 'Memory Management',
    shortDesc: 'Stop relying on libc magic. Implement an explicit free-list dynamic memory allocator with 8-byte alignment, boundary-tag block headers, split/merge coalescing, and mmap fallback.',
    accentColor: {
      primary: 'emerald',
      gradient: 'from-emerald-500 to-teal-500',
      badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      borderHover: 'hover:border-emerald-500/50',
      glowShadow: 'rgba(16, 185, 129, 0.15)'
    },
    languages: [
      {
        name: 'C (C99 / C11)',
        tag: 'C',
        badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        why: 'The gold standard for low-level systems. Gives raw pointer arithmetic and direct control over memory layout without language runtime interference.',
        starterTip: 'Compile with `gcc -Wall -Wextra -Werror -pedantic -g` and test under Valgrind.'
      },
      {
        name: 'C++',
        tag: 'C++',
        badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
        why: 'Allows implementing a custom C++ STL allocator adapter (`std::allocator`) backed by your allocator.',
        starterTip: 'Avoid `new`/`delete` inside your allocator implementation to prevent recursive calls!'
      },
      {
        name: 'Zig',
        tag: 'Zig',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        why: 'Zig has explicit allocators as first-class citizens. You implement the `std.mem.Allocator` interface cleanly.',
        starterTip: 'Use Zig’s `@ptrCast` and `@alignCast` to master explicit memory alignments.'
      },
      {
        name: 'Rust',
        tag: 'Rust',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
        why: 'Implement Rust’s `GlobalAlloc` trait using `unsafe` blocks. Teaches you why Rust’s safety rules exist.',
        starterTip: 'Implement `unsafe impl GlobalAlloc for MyAllocator`.'
      }
    ],
    scope: {
      overview: 'Every time you call malloc() or new, the operating system does NOT run a kernel interrupt for every 16-byte object. Instead, a userspace memory allocator manages a large virtual memory pool requested via brk() or mmap(). In this project, you will write a production-grade, userspace memory manager from complete scratch.',
      whatYouWillBuild: [
        'A drop-in `void* my_malloc(size_t size)` function with 8/16-byte pointer alignment',
        'A fast `void my_free(void* ptr)` that reclaims memory and merges adjacent free blocks',
        'Boundary tag headers & footers for bidirectional O(1) block coalescing',
        'Segregated free lists or first-fit explicit linked list tracking free chunks',
        'Direct OS memory expansion using `sbrk()` or anonymous `mmap()` syscalls',
        '`my_realloc()` and `my_calloc()` with zero-overhead memory zeroing'
      ],
      whatYouWontUse: [
        'NO libc `malloc`, `calloc`, `free`, `realloc`',
        'NO standard container libraries (`std::vector`, `std::map`)',
        'NO AI autocomplete or copilot snippet pasting',
        'NO pre-built memory debugging libraries'
      ],
      realWorldComparison: 'This is the foundational architecture powering jemalloc (used by FreeBSD and Meta), tcmalloc (used by Google), and glibc ptmalloc.'
    },
    videoTour: {
      durationSeconds: 615,
      durationFormatted: '10:15',
      title: 'Full ~10-Min Video Tour: Building a Userspace Memory Manager',
      overviewSummary: 'In this 10-minute visual walkthrough, we trace how virtual memory pages move from the Linux kernel into userspace, examine boundary tag headers, demonstrate live Valgrind memory leak checks, and observe O(1) block coalescing in action.',
      instructorName: 'Linus C. (Systems Architect)',
      masterclass: {
        youtubeId: '_HLAWI84aFA',
        title: 'Coding malloc in C from Scratch (Using sbrk & brk)',
        author: 'Daniel Hirsch',
        duration: '21:15',
        description: 'Direct step-by-step code implementation: requesting memory with sbrk(), linked list chunk headers, pointer math, and void* alignment.',
        tag: 'Solution Code: sbrk() & malloc'
      },
      playlist: [
        {
          youtubeId: '_HLAWI84aFA',
          title: 'Coding malloc in C from Scratch (Using sbrk & brk)',
          author: 'Daniel Hirsch',
          duration: '21:15',
          description: 'Direct step-by-step code implementation: requesting memory with sbrk(), linked list chunk headers, pointer math, and void* alignment.',
          tag: 'Solution: sbrk() & malloc'
        },
        {
          youtubeId: 'NDKArv9WAlQ',
          title: 'System Programming with C: Memory Management with brk and sbrk',
          author: 'Olive Stem',
          duration: '14:50',
          description: 'Detailed walkthrough of the program break, virtual heap pages, and moving the kernel break pointer with brk() and sbrk().',
          tag: 'Syscall Deep Dive: brk & sbrk'
        },
        {
          youtubeId: 'XV5sRaSVtXQ',
          title: 'How Processes Get More Memory (mmap, brk)',
          author: 'Prof. Jacob Sorber',
          duration: '11:30',
          description: 'Operating systems professor Jacob Sorber breaks down how Unix kernels allocate pages via brk() vs anonymous mmap() syscalls.',
          tag: 'OS Internals: Heap vs mmap'
        },
        {
          youtubeId: 'EsMp_pFVnus',
          title: 'C Programming Tutorial: malloc() Function & Dynamic Allocation',
          author: 'Prof. Aleksandar Haber PhD',
          duration: '18:30',
          description: 'A foundational tutorial on heap memory layout, void* pointer conversions, and preventing memory leaks in C.',
          tag: 'Memory Layout & Safety'
        }
      ],
      chapters: [
        {
          timeSeconds: 0,
          timestamp: '00:00',
          title: 'Introduction & Real-World Context (jemalloc & glibc)',
          description: 'Why the operating system does not allocate byte-by-byte and why every program relies on a userspace heap.',
          subtitle: 'Welcome! Today we are building what is arguably the most foundational piece of systems software: a memory allocator.',
          scene: {
            type: 'overview',
            headline: 'The Impedance Mismatch: Kernel Pages (4KB) vs User Objects (16B)',
            visualSnippet: 'Kernel Page Granularity: 4,096 Bytes\nUser Object Request: 12 Bytes\nGoal: Zero syscall overhead per allocation via userspace heap pooling.',
            calloutText: 'jemalloc, tcmalloc, and glibc ptmalloc all solve this exact dilemma.'
          }
        },
        {
          timeSeconds: 135,
          timestamp: '02:15',
          title: 'Virtual Address Space & The Program Break (sbrk)',
          description: 'Visualizing how the process data segment expands and why 8-byte pointer alignment is non-negotiable.',
          subtitle: 'Here in the virtual memory map, our heap segment sits right above uninitialized BSS. When we call sbrk, the kernel break pointer moves up.',
          scene: {
            type: 'architecture',
            headline: 'Memory Map: Heap Segment Expansion via sbrk()',
            visualSnippet: '0x00000000 [Text / Code Segment] (Read-Only)\n0x00400000 [Data / BSS Segment] (Global Variables)\n0x00600000 [Heap Segment] ---> [sbrk(aligned_size)] ---> Moves Upward\n0x7FFF0000 [Stack Segment] ---> Grows Downward',
            calloutText: 'Bitwise alignment math: (size + 7) & ~7 ensures hardware bus integrity on ARM and x86_64.'
          }
        },
        {
          timeSeconds: 275,
          timestamp: '04:35',
          title: 'Live Demo: Stepping my_malloc() Under GDB & Valgrind',
          description: 'A live demonstration of allocating blocks, checking boundary headers, and proving zero leaks under Valgrind.',
          subtitle: 'Watch as we execute 1,000 allocations of random sizes and run Valgrind to verify zero memory leaks or unaligned pointer errors.',
          scene: {
            type: 'demo',
            headline: 'Valgrind Leak Sanitizer & Allocation Stress Run',
            visualSnippet: '$ ./test_allocator --stress 1000\n[ALLOC] 64 bytes at 0x1000 (Aligned 8B: OK)\n[ALLOC] 128 bytes at 0x1050 (Aligned 8B: OK)\n[FREE] Freed block at 0x1000\n==10421== HEAP SUMMARY:\n==10421==     in use at exit: 0 bytes in 0 blocks\n==10421==   total allocs: 1,000, total frees: 1,000\n==10421== All heap blocks were freed -- no leaks are possible',
            calloutText: 'Proves complete memory reclamation without external fragmentation.'
          }
        },
        {
          timeSeconds: 430,
          timestamp: '07:10',
          title: 'Code Walkthrough: Header Prepending & Free List Splitting',
          description: 'Analyzing the exact pointer arithmetic required to offset headers and split large free blocks.',
          subtitle: 'In the code, notice how passing ptr to free() calculates the header address by moving backward one sizeof(block_header_t).',
          scene: {
            type: 'code',
            headline: 'Pointer Offset & Header Navigation Mechanics',
            visualSnippet: 'typedef struct block_header {\n    size_t size;\n    int is_free;\n} block_header_t;\n\n// Backward navigation:\nblock_header_t* h = (block_header_t*)user_ptr - 1;',
            calloutText: 'The user payload is returned as (void*)(header + 1), perfectly 8-byte aligned.'
          }
        },
        {
          timeSeconds: 550,
          timestamp: '09:10',
          title: 'Knuth Boundary Tag Coalescing & Final Wrap-Up',
          description: 'How footers allow O(1) neighbor inspection without linked list linear scans.',
          subtitle: 'By checking the footer of the block to our left, we can determine if it is free in constant O(1) time and merge them immediately.',
          scene: {
            type: 'benchmark',
            headline: 'Fragmentation Benchmark: Coalescing vs Naive Free List',
            visualSnippet: 'Heap Expansion with Coalescing:   3.2 MB (Bounded)\nHeap Expansion without Coalesce:  48.7 MB (Severe Fragmentation)\nCoalesce Time Complexity:        O(1) Constant Time via Footers',
            calloutText: 'You now possess the foundational intuition behind jemalloc and glibc ptmalloc.'
          }
        }
      ]
    },
    gettingStarted: {
      prerequisites: [
        'GCC 11+ or Clang 14+ with C99 support',
        'GDB or LLDB for stepping through pointer arithmetic',
        'Valgrind (`valgrind --tool=memcheck`) for leak verification',
        'Make or standard shell build scripts'
      ],
      projectStructure: `memory-allocator/
├── Makefile
├── include/
│   └── my_malloc.h
├── src/
│   └── my_malloc.c
└── tests/
    └── test_suite.c`,
      visualArchitectureImage: {
        caption: 'Heap Virtual Memory Layout: Boundary Tag Headers, 8-Byte Payloads, and Free List Nodes',
        diagramType: 'Virtual Memory Schematic',
        elements: [
          { id: '1', title: 'Block Header (16B)', desc: 'Stores block size (8B) and is_free allocation flag (4B) padded to 16 bytes.', color: 'emerald', role: 'Metadata' },
          { id: '2', title: 'User Payload', desc: 'The usable byte memory returned to application. Guaranteed 8-byte aligned.', color: 'cyan', role: 'User Space' },
          { id: '3', title: 'Boundary Footer (16B)', desc: 'Matches header size and flag. Enables O(1) backward neighbor lookup on free.', color: 'emerald', role: 'Coalescing' },
          { id: '4', title: 'Free List Overlay', desc: 'Overlaid directly inside payload when free: stores *next and *prev pointers.', color: 'amber', role: 'In-Place Data Structure' },
          { id: '5', title: 'Kernel Break (sbrk)', desc: 'The process boundary separating allocated heap pages from unmapped virtual memory.', color: 'purple', role: 'Kernel Boundary' }
        ],
        connections: [
          'User calls my_malloc(size) -> First-Fit searches Free List Overlay for suitable hole',
          'If no hole found -> Invokes sbrk(aligned_size) to advance Kernel Break pointer',
          'User calls my_free(ptr) -> Inspects Header (ptr - 1) -> Checks Neighbor Footers -> O(1) Coalescing'
        ]
      },
      starterFileName: 'my_malloc_starter.c',
      starterLanguage: 'C',
      starterCode: `#include <unistd.h>
#include <stdint.h>
#include <stdio.h>
#include <assert.h>

// Step Zero: 8-Byte Alignment Macro
#define ALIGN8(x) (((x) + 7) & ~((size_t)7))

// Block Header Definition
typedef struct block_header {
    size_t size;          // Total size of block including header
    int is_free;          // 1 if free, 0 if allocated
    struct block_header* next;
} block_header_t;

#define HEADER_SIZE sizeof(block_header_t)

static block_header_t* free_list_head = NULL;

// Naive Bump Allocator Baseline (Step 1)
void* naive_malloc(size_t size) {
    if (size == 0) return NULL;

    size_t aligned_payload = ALIGN8(size);
    size_t total_size = ALIGN8(HEADER_SIZE + aligned_payload);

    // Request virtual memory from kernel
    block_header_t* header = (block_header_t*)sbrk(total_size);
    if (header == (void*)-1) {
        return NULL; // Out of memory
    }

    header->size = total_size;
    header->is_free = 0;
    header->next = NULL;

    // Return pointer immediately following the header
    void* payload = (void*)(header + 1);
    return payload;
}

void naive_free(void* ptr) {
    if (!ptr) return;
    block_header_t* header = (block_header_t*)ptr - 1;
    header->is_free = 1;
    printf("[naive_free] Marked block at %p (size %zu) as FREE.\\n", (void*)header, header->size);
}

int main() {
    printf("--- Testing Baseline Naive Allocator ---\\n");
    int* num1 = (int*)naive_malloc(sizeof(int));
    *num1 = 42;
    printf("Allocated integer at address: %p, value: %d\\n", (void*)num1, *num1);
    assert(((uintptr_t)num1 % 8) == 0); // Verify 8-byte alignment

    char* str = (char*)naive_malloc(25);
    snprintf(str, 25, "Handcrafted Allocator");
    printf("Allocated string at address: %p, value: '%s'\\n", (void*)str, str);
    assert(((uintptr_t)str % 8) == 0);

    naive_free(num1);
    naive_free(str);
    printf("Baseline test passed successfully! Ready for Milestone 2.\\n");
    return 0;
}`,
      codeBreakdown: [
        { lines: 'Lines 6-7', concept: '8-Byte Alignment Bitmask', detail: 'Uses bitwise math `(x + 7) & ~7` to round any byte size up to the nearest multiple of 8.' },
        { lines: 'Lines 9-14', concept: 'Metadata Header Struct', detail: 'Prepends size and allocation flag before the user payload pointer.' },
        { lines: 'Lines 21-27', concept: 'sbrk() Kernel Syscall', detail: 'Advances the process program break to carve new virtual memory pages.' },
        { lines: 'Lines 33-35', concept: 'Pointer Offset Return', detail: '`header + 1` performs pointer arithmetic by jumping `sizeof(block_header_t)` bytes forward.' },
        { lines: 'Lines 37-41', concept: 'Backward Header Recovery', detail: 'In free(), `(block_header_t*)ptr - 1` jumps backward to retrieve the metadata header.' }
      ],
      quickstartCommands: [
        'gcc -Wall -Wextra -pedantic -g my_malloc_starter.c -o test_alloc',
        './test_alloc',
        'valgrind --leak-check=full ./test_alloc'
      ],
      expectedOutput: `--- Testing Baseline Naive Allocator ---
Allocated integer at address: 0x100004018, value: 42
Allocated string at address: 0x100004040, value: 'Handcrafted Allocator'
[naive_free] Marked block at 0x100004000 (size 32) as FREE.
[naive_free] Marked block at 0x100004028 (size 48) as FREE.
Baseline test passed successfully! Ready for Milestone 2.`
    },
    milestones: [
      {
        step: 1,
        id: 'sbrk-bump',
        title: 'The Bump (Arena) Allocator & Alignment',
        goal: 'Request your first virtual page from the OS kernel and implement a naive bump allocator without freeing.',
        specs: [
          'Read the current program break: Call `sbrk(0)` to obtain the base address of the unallocated heap segment. Verify that the return value is not `(void*)-1` (which signals kernel error).',
          'Implement the 8-byte alignment formula: Modern 64-bit architectures require addresses to be multiples of 8. Compute `size_t aligned_size = (size + 7) & ~((size_t)7)`. For example, a 12-byte request must be padded to 16 bytes.',
          'Advance the program break: Call `sbrk(aligned_size)` to move the kernel break pointer upward. The address returned by `sbrk` is your new chunk of memory.',
          'Return the pointer to caller: Maintain an internal allocation counter and return the previous break pointer. At this stage, memory cannot be reclaimed (bump-only).'
        ],
        syscallsOrConcepts: ['sbrk()', 'brk()', 'Program Break', 'Word Alignment Formula', 'Virtual Address Space'],
        checkpoint: 'You can allocate 10 integers sequentially and print their memory addresses. Verify that each address is a multiple of 8.',
        manualHandCheck: 'Write a small test loop allocating 100 blocks of random sizes (4 to 512 bytes). Print addresses and assert no overlaps.'
      },
      {
        step: 2,
        id: 'header-metadata',
        title: 'Block Metadata & Header Prepending',
        goal: 'Embed metadata headers directly before each payload pointer so `free()` knows the block size and status.',
        specs: [
          'Define the metadata struct: Create `typedef struct block_header { size_t size; int is_free; } block_header_t;`. Ensure `sizeof(block_header_t)` is padded to an 8-byte multiple (typically 16 bytes).',
          'Calculate total allocation size: The kernel must allocate space for both the header and user payload: `total_size = ALIGN8(sizeof(block_header_t) + requested_size)`.',
          'Place the header in memory: Write the block size and mark `is_free = 0` at the memory address returned by `sbrk()`.',
          'Offset the return pointer: The user must only receive a pointer to the payload: `void* user_ptr = (void*)((char*)header + sizeof(block_header_t))`.',
          'Retrieve the header in free(): When given `void* ptr`, compute the header address by moving backward: `block_header_t* header = (block_header_t*)ptr - 1`. Read `header->size` and set `header->is_free = 1`.'
        ],
        syscallsOrConcepts: ['Pointer Arithmetic', 'Struct Layout & Padding', 'Type Casting', 'Header Offsetting'],
        checkpoint: 'Passing `ptr` to `my_free(ptr)` successfully inspects `((struct block_header*)ptr - 1)->size`.',
        manualHandCheck: 'Assert that `(uintptr_t)payload_ptr % 8 == 0` for any requested size.'
      },
      {
        step: 3,
        id: 'explicit-free-list',
        title: 'Explicit Doubly-Linked Free List & Block Splitting',
        goal: 'Reuse freed memory blocks instead of continually growing the heap.',
        specs: [
          'In-place free list nodes: When a block is free, its payload area is unused. Overlay a doubly-linked list node directly into the payload memory: `typedef struct free_node { struct free_node* next; struct free_node* prev; } free_node_t;`. Zero extra memory overhead!',
          'Maintain a global head pointer: Declare `static block_header_t* free_list_head = NULL;`.',
          'Implement First-Fit search: In `my_malloc()`, traverse `free_list_head` to locate the first free block where `block->size >= total_requested_size`.',
          'Block Splitting: If a free block is significantly larger than needed (`block->size >= total_requested_size + sizeof(block_header_t) + 8`), split it! Carve out the requested portion, and initialize a new `block_header_t` for the remaining free remainder.',
          'Unlink and mark allocated: Remove the chosen block from the explicit free list, set `is_free = 0`, and return the payload pointer.'
        ],
        syscallsOrConcepts: ['Doubly-Linked List', 'Memory Re-use', 'First-Fit vs Best-Fit', 'Block Splitting'],
        checkpoint: 'Allocating 64 bytes, freeing it, and allocating 32 bytes reuses the exact same virtual memory address.',
        manualHandCheck: 'Draw the linked list on paper before and after the split. Verify the node pointers in GDB.'
      },
      {
        step: 4,
        id: 'coalescing',
        title: 'O(1) Boundary Tag Coalescing',
        goal: 'Eliminate external fragmentation by merging adjacent free memory blocks instantly.',
        specs: [
          'Add a boundary tag footer: At the very end of every memory block, place a footer matching the header: `typedef struct block_footer { size_t size; int is_free; } block_footer_t;`.',
          'Locate the previous block (Left Neighbor): Calculate `block_footer_t* prev_footer = (block_footer_t*)((char*)current_header - sizeof(block_footer_t));`. If `prev_footer->is_free == 1`, jump backward by `prev_footer->size` to locate the left block header!',
          'Locate the next block (Right Neighbor): Calculate `block_header_t* next_header = (block_header_t*)((char*)current_header + current_header->size);`. Check `next_header->is_free`.',
          'Merge logic (All 4 Cases): Case 1: Both neighbors allocated (add to free list). Case 2: Right free (absorb right block, update total size). Case 3: Left free (absorb current into left block). Case 4: Both free (merge left, current, and right into one huge block in O(1) time!).',
          'Update boundary tags: Set the new combined size in the leftmost header and rightmost footer.'
        ],
        syscallsOrConcepts: ['Knuth Boundary Tags', 'External Fragmentation', 'Coalescing', 'O(1) Neighbor Lookup'],
        checkpoint: 'Allocating 3 blocks [A, B, C], freeing [A, B, C] in any order merges them into one single huge block equal to total size.',
        manualHandCheck: 'Inspect the free list length; it should be 1 after all three are freed.'
      },
      {
        step: 5,
        id: 'mmap-threshold',
        title: 'Large Allocations via mmap() & munmap()',
        goal: 'Prevent large allocations from bloating the heap and fragmenting the program break.',
        specs: [
          'Define allocation threshold: Set `const size_t MMAP_THRESHOLD = 128 * 1024;` (128 KB).',
          'Handle large allocations: In `my_malloc()`, if `total_size >= MMAP_THRESHOLD`, bypass `sbrk()` and call `mmap(NULL, total_size, PROT_READ | PROT_WRITE, MAP_PRIVATE | MAP_ANONYMOUS, -1, 0)`.',
          'Encode allocation type bit: In the header `size` field, use the lowest bit (e.g. `size | 0x2`) to flag that the chunk was allocated via `mmap`.',
          'Reclaim physical pages in free: In `my_free()`, check if `(header->size & 0x2) != 0`. If true, call `munmap(header, actual_size)` to return the physical frames directly to the kernel.'
        ],
        syscallsOrConcepts: ['mmap()', 'munmap()', 'Anonymous Memory Pages', 'Bit Packing'],
        checkpoint: 'Allocating 10 MB works seamlessly and releases physical memory back to the OS immediately on free.',
        manualHandCheck: 'Observe process resident set size (RSS) in `top` or `/proc/self/status` drop immediately after `free`.'
      },
      {
        step: 6,
        id: 'preload-replacement',
        title: 'LD_PRELOAD Dynamic Binary Interposition',
        goal: 'Replace the system malloc of standard Linux utilities like `ls` with your custom allocator!',
        specs: [
          'Export standard symbols: Implement `malloc`, `free`, `calloc`, and `realloc` with standard POSIX function signatures.',
          'Compile as shared library: Run `gcc -shared -fPIC -O2 -o libmymalloc.so my_malloc.c -ldl`.',
          'Avoid recursion during initialization: Do not call `printf` inside `malloc` because `printf` internally calls `malloc`! Use raw `write(2, ...)` syscall for debug logging.',
          'Interpose into system binaries: Execute `LD_PRELOAD=./libmymalloc.so /bin/ls -la` to prove your allocator manages memory for real production software.'
        ],
        syscallsOrConcepts: ['Dynamic Linking', 'ELF Symbol Interposition', 'LD_PRELOAD', 'Shared Objects'],
        checkpoint: '`LD_PRELOAD=./libmymalloc.so ls` executes without segfaults and prints directory contents.',
        manualHandCheck: 'Log allocation counts to `stderr` during `ls` run to prove your code handled every byte.'
      }
    ],
    theory: {
      highLevelArchitecture: 'A memory allocator sits between the application code and the OS kernel virtual memory subsystem. The kernel allocates in units of 4KB pages. The application requests arbitrary 12-byte, 48-byte, or 1000-byte chunks. The allocator bridges this impedance mismatch by carving large OS pages into smaller chunks, tracking which slices are occupied and which are free.',
      mentalModel: 'Imagine a physical notebook where pages represent 4096-byte kernel memory. Each time the app asks for a sentence, you write a small header stamp ("12 bytes used") and give the reader a bookmark. When they return the bookmark, you scratch off the "used" stamp. If two adjacent paragraphs are scratched off, you draw a bracket combining them into one bigger paragraph.',
      dataStructures: [
        {
          name: 'Block Header / Footer (Boundary Tag)',
          description: 'A 16-byte metadata structure directly prepending the usable payload. Stores size, allocation flag, and previous block size for backward traversing.',
          asciiDiagram: `
+-------------------------------------------------------------+
| Header: size (8 bytes) | is_free (4 bytes) | pad (4 bytes)  |
+-------------------------------------------------------------+
| User Payload (returned by my_malloc)                        |
| ... (aligned to 8 bytes) ...                                |
+-------------------------------------------------------------+
| Footer: size (8 bytes) | is_free (4 bytes) | pad (4 bytes)  |
+-------------------------------------------------------------+`
        }
      ],
      keySyscalls: [
        {
          syscall: 'sbrk',
          signature: 'void* sbrk(intptr_t increment);',
          purpose: 'Adjusts the end of the process data segment (program break). Passing 0 queries current address.'
        },
        {
          syscall: 'mmap',
          signature: 'void* mmap(void* addr, size_t length, int prot, int flags, int fd, off_t offset);',
          purpose: 'Creates a new virtual memory mapping in the process address space. Used with MAP_ANONYMOUS for large blocks.'
        }
      ],
      commonPitfalls: [
        'Unaligned Pointers: Accessing 64-bit integers on non-8-byte aligned addresses causes bus errors or performance penalties on ARM/x86.',
        'Off-by-One Pointer Arithmetic: Remember `(char*)ptr + 1` moves 1 byte, but `(int*)ptr + 1` moves 4 bytes!'
      ],
      visualizerType: 'allocator'
    },
    hints: {
      level1_concept: 'Think of memory as a continuous strip of paper. You cannot push addresses down; you can only ask the kernel for more paper at the high end. Your main goal is reusing the blank holes left behind by freed blocks.',
      level2_architecture: 'Store all blocks in address order on the heap. When freeing a block at address P, the block to its immediate right begins at `(char*)P + P->size`. If that block has `is_free == 1`, merge them by adding its size to P!',
      level3_codeSkeleton: `void* my_malloc(size_t size) {
    if (size == 0) return NULL;
    size_t total_size = ALIGN8(size + HEADER_SIZE);
    block_t* blk = find_fit(total_size);
    if (!blk) {
        blk = extend_heap(total_size);
        if (!blk) return NULL;
    } else {
        split_block(blk, total_size);
    }
    blk->is_free = 0;
    return (void*)(blk + 1);
}`
    },
    verification: {
      testScenarios: [
        'Smoke Test: Allocate 100 pointers of random sizes (8 to 4096 bytes). Write unique patterns into each. Free in reverse order.',
        'Interleaved Free Test: Allocate [A, B, C, D, E]. Free [B, D]. Allocate F of size (B + D). Verify allocator reuses space without calling sbrk.'
      ],
      cliCommands: [
        'gcc -Wall -Wextra -g -O0 my_malloc.c test_suite.c -o test_malloc',
        './test_malloc',
        'valgrind --leak-check=full ./test_malloc'
      ],
      edgeCasesToBreak: [
        'Calling `my_malloc(0)` -> must return NULL or unique non-dereferenceable pointer.',
        'Calling `my_free(NULL)` -> must be a safe no-op without crashing.'
      ]
    }
  },
  {
    id: 'sockets-chat',
    title: 'High-Throughput TCP Sockets Chat Engine',
    tagline: 'Build a C10K non-blocking TCP chat server with epoll/kqueue, framing, and custom binary protocol',
    badge: 'Async Networking',
    difficulty: 'Advanced',
    estimatedHours: '25-35 hours',
    category: 'Networking & Concurrency',
    shortDesc: 'Throw away thread-per-client antipatterns. Build an event-driven multiplexed TCP server using raw POSIX sockets, non-blocking I/O, epoll/kqueue, ring buffers, and framed protocols from scratch.',
    accentColor: {
      primary: 'cyan',
      gradient: 'from-cyan-500 to-blue-500',
      badgeClass: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      borderHover: 'hover:border-cyan-500/50',
      glowShadow: 'rgba(6, 182, 212, 0.15)'
    },
    languages: [
      {
        name: 'C (POSIX / Linux)',
        tag: 'C',
        badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        why: 'Exposes raw BSD socket API and Linux `epoll` system calls directly without abstraction overhead.',
        starterTip: 'Use `fcntl(fd, F_SETFL, O_NONBLOCK)` and master `epoll_create1`, `epoll_ctl`, `epoll_wait`.'
      },
      {
        name: 'Rust',
        tag: 'Rust',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
        why: 'Build your own event loop using raw file descriptors and `libc::epoll` before touching high-level runtimes.',
        starterTip: 'Use `std::os::unix::io::AsRawFd` and write the loop yourself.'
      },
      {
        name: 'Zig',
        tag: 'Zig',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        why: 'Zig provides clean standard library bindings to Linux epoll with zero hidden allocations.',
        starterTip: 'Use `std.os.linux.epoll_wait` for clean error union handling.'
      }
    ],
    scope: {
      overview: 'How do Discord, Redis, and Nginx handle 100,000 simultaneous clients on a modest server? They do NOT spawn 100,000 threads. Instead, they run an event loop on a single thread using asynchronous OS readiness notifications. In this project, you will build this from raw metal.',
      whatYouWillBuild: [
        'A TCP listening socket bound to port 9000 with `SO_REUSEADDR`',
        'Non-blocking accept loop handling connection bursts with `accept4()`',
        'I/O Multiplexing event loop with Linux `epoll_wait` or macOS `kqueue`',
        'Fixed-header framing protocol: 4-byte length + 1-byte opcode + payload',
        'Per-connection circular ring buffers handling partial socket `read()` and `write()`'
      ],
      whatYouWontUse: [
        'NO high-level networking frameworks (Tokio, libuv, Socket.IO)',
        'NO multi-threading for connection handling (pure single-threaded async event loop)',
        'NO AI generated socket boilerplate'
      ],
      realWorldComparison: 'The exact architectural pattern used by Nginx, Redis, and HAProxy networking cores.'
    },
    videoTour: {
      durationSeconds: 620,
      durationFormatted: '10:20',
      title: 'Full ~10-Min Video Tour: Event-Driven epoll Socket Server',
      overviewSummary: 'In this 10-minute visual tour, learn why thread-per-client architectures crash under 10K connections, how Linux epoll multiplexes thousands of file descriptors on 1 thread, and watch live framed packets broadcast between multiple clients.',
      instructorName: 'Sarah K. (Distributed Systems Lead)',
      masterclass: {
        youtubeId: 'WuwUk7Mk80E',
        title: 'All About Epoll: Scalable I/O Syscalls in Linux (With C Code)',
        author: 'Low-Level Networking Tutorials',
        duration: '19:40',
        description: 'Direct step-by-step solution: initializing epoll_create1(), registering sockets with epoll_ctl(), and non-blocking event loops with epoll_wait().',
        tag: 'Solution Code: epoll Syscalls'
      },
      playlist: [
        {
          youtubeId: 'WuwUk7Mk80E',
          title: 'All About Epoll: Scalable I/O Syscalls in Linux (With C Code)',
          author: 'Low-Level Networking Tutorials',
          duration: '19:40',
          description: 'Direct step-by-step solution: initializing epoll_create1(), registering sockets with epoll_ctl(), and non-blocking event loops with epoll_wait().',
          tag: 'Solution: epoll Syscalls'
        },
        {
          youtubeId: 'Y6pFtgRdUts',
          title: 'How One Thread Listens to Many Sockets with I/O Multiplexing in C',
          author: 'Prof. Jacob Sorber',
          duration: '13:45',
          description: 'Watch Professor Jacob Sorber explain how single-threaded event loops handle multiple concurrent network sockets without blocking threads.',
          tag: 'I/O Multiplexing Fundamentals'
        },
        {
          youtubeId: 'esXw4bdaZkc',
          title: 'Program Your Own Web Server & Socket Engine in C',
          author: 'Prof. Jacob Sorber',
          duration: '16:20',
          description: 'Complete hands-on guide to binding sockets, accepting client connections, parsing HTTP wire formats, and sending responses in pure C.',
          tag: 'Socket Bootstrap & Wire Format'
        }
      ],
      chapters: [
        {
          timeSeconds: 0,
          timestamp: '00:00',
          title: 'The C10K Problem: Why Threads Thrash the CPU',
          description: 'Stack frame memory exhaustion, context switching overhead, and the birth of event-driven async I/O.',
          subtitle: 'Welcome to network programming. Spawning 10,000 threads consumes 80 gigabytes of RAM in stack space alone.',
          scene: {
            type: 'overview',
            headline: 'Thread-Per-Client vs Event-Driven Single Thread',
            visualSnippet: 'Thread-Per-Client: 10,000 threads * 8MB default stack = 80 GB RAM wasted!\nepoll Model: 1 single thread + O(1) kernel event queue = 35 MB RAM total.',
            calloutText: 'Nginx, Redis, and Node.js all use this single-threaded event loop architecture.'
          }
        },
        {
          timeSeconds: 135,
          timestamp: '02:15',
          title: 'Linux epoll Mechanics & Non-blocking Sockets',
          description: 'Understanding fcntl O_NONBLOCK and how epoll_wait unblocks when kernel buffers receive bytes.',
          subtitle: 'We configure our socket as non-blocking so read() never halts our thread. When data arrives, epoll notifies us.',
          scene: {
            type: 'architecture',
            headline: 'Kernel Socket Buffer & epoll_wait Event Notification',
            visualSnippet: 'Client [SYN/ACK] ---> Kernel Socket Receive Buffer (SO_RCVBUF)\n                               |\n                       (Bytes Available!)\n                               v\nThread Sleeping in epoll_wait() ---> Wakes Up with EPOLLIN event',
            calloutText: 'epoll_ctl registers readiness interest without active CPU polling.'
          }
        },
        {
          timeSeconds: 280,
          timestamp: '04:40',
          title: 'Live Demo: 500 Sockets & Wire Framing Broadcast',
          description: 'Demonstrating netcat clients joining chat rooms and receiving framed messages instantly.',
          subtitle: 'Here in our demonstration, three clients connect on port 9000. When Alice types, Bob and Charlie receive it in 0.3 milliseconds.',
          scene: {
            type: 'demo',
            headline: 'Real-Time Multi-Client Terminal Broadcast',
            visualSnippet: '[SERVER] epoll_create1(0) initialized. listen_fd=3 on :9000\n[CLIENT 4] Connected: alice_99 joined #general\n[CLIENT 5] Connected: bob_42 joined #general\n[MSG] <alice_99> Hello everyone! [Length: 15, Opcode: 0x03]\n[FANOUT] Broadcasted 20 bytes to 1 peer in #general (0.28ms latency)',
            calloutText: 'Shows non-blocking fanout without any connection stalling.'
          }
        },
        {
          timeSeconds: 440,
          timestamp: '07:20',
          title: 'Code Walkthrough: Ring Buffers & Solving Short Reads',
          description: 'Why TCP is a continuous byte stream, not a packet stream, and how ring buffers prevent broken frames.',
          subtitle: 'Remember: one write() call does not equal one read(). We must buffer bytes until the full length arrives.',
          scene: {
            type: 'code',
            headline: 'Fixed-Header Length-Prefixed Framing Loop',
            visualSnippet: 'uint32_t payload_len = ntohl(*(uint32_t*)client->rx_buf);\nif (client->rx_len >= payload_len + 5) {\n    dispatch_message(client->rx_buf + 5, payload_len);\n    slide_buffer(client, payload_len + 5);\n}',
            calloutText: 'Ensures packets are never truncated or merged under high network load.'
          }
        },
        {
          timeSeconds: 555,
          timestamp: '09:15',
          title: 'Handling Partial Writes & SIGPIPE Disconnections',
          description: 'Harden your server against slow network clients and unexpected connection drops.',
          subtitle: 'When a remote client disconnects and you write to their socket, the kernel sends SIGPIPE. Always ignore it.',
          scene: {
            type: 'benchmark',
            headline: 'Saturation Benchmark: 10,000 Concurrent Sockets',
            visualSnippet: 'Active Sockets:         10,000 persistent connections\nMemory Footprint:       42.4 MB RAM total\nCPU Usage (Idle):       0.4% on 1 core\np99 Broadcast Latency:  1.82 milliseconds',
            calloutText: 'Proves the industrial strength of handcrafted event-driven I/O.'
          }
        }
      ]
    },
    gettingStarted: {
      prerequisites: [
        'Linux or macOS with GCC / Clang',
        'netcat (`nc`) or telnet for sending raw socket test bytes',
        'Python 3 for running multi-client stress test scripts'
      ],
      projectStructure: `sockets-chat/
├── Makefile
├── server.c
├── client.c
└── stress_test.py`,
      visualArchitectureImage: {
        caption: 'Event-Driven Sockets Architecture: Non-Blocking Epoll Dispatcher and Ring Buffers',
        diagramType: 'Network Multiplexing Pipeline',
        elements: [
          { id: '1', title: 'Listening Socket (Port 9000)', desc: 'Configured with SO_REUSEADDR and O_NONBLOCK to accept client bursts.', color: 'cyan', role: 'Inbound Gateway' },
          { id: '2', title: 'epoll_wait Event Loop', desc: 'Single thread waiting in kernel space for socket readiness notifications (EPOLLIN/EPOLLOUT).', color: 'emerald', role: 'Event Dispatcher' },
          { id: '3', title: 'Client Ring Buffer (64KB)', desc: 'Accumulates fragmented TCP bytes until complete length-prefixed frame arrives.', color: 'amber', role: 'Stream Framing' },
          { id: '4', title: 'Room Broadcast Router', desc: 'Dispatches decoded messages to all peers connected to the same chat room.', color: 'purple', role: 'Routing State' }
        ],
        connections: [
          'Clients connect -> Kernel triggers EPOLLIN on listen_fd -> accept4(SOCK_NONBLOCK)',
          'Client sends bytes -> Kernel triggers EPOLLIN on client_fd -> Read into Ring Buffer',
          'Full frame detected -> Room Broadcast Router writes to peer client sockets'
        ]
      },
      starterFileName: 'echo_server_starter.c',
      starterLanguage: 'C',
      starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <sys/socket.h>
#include <netinet/in.h>

#define PORT 9000
#define BUFFER_SIZE 4096

// Set file descriptor to non-blocking mode
int set_nonblocking(int fd) {
    int flags = fcntl(fd, F_GETFL, 0);
    if (flags == -1) return -1;
    return fcntl(fd, F_SETFL, flags | O_NONBLOCK);
}

int main() {
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd < 0) {
        perror("socket failed");
        exit(EXIT_FAILURE);
    }

    // Allow immediate port reuse
    int opt = 1;
    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    struct sockaddr_in address;
    memset(&address, 0, sizeof(address));
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    if (bind(server_fd, (struct sockaddr*)&address, sizeof(address)) < 0) {
        perror("bind failed");
        exit(EXIT_FAILURE);
    }

    if (listen(server_fd, 128) < 0) {
        perror("listen failed");
        exit(EXIT_FAILURE);
    }

    printf("[SERVER] Listening on 0.0.0.0:%d (Blocking Echo Baseline)...\\n", PORT);
    printf("[HINT] Connect using: nc localhost %d\\n", PORT);

    // Accept baseline client connection
    struct sockaddr_in client_addr;
    socklen_t client_len = sizeof(client_addr);
    int client_fd = accept(server_fd, (struct sockaddr*)&client_addr, &client_len);
    if (client_fd < 0) {
        perror("accept failed");
        exit(EXIT_FAILURE);
    }

    printf("[CLIENT] Connection established! Echoing incoming bytes...\\n");
    char buffer[BUFFER_SIZE];
    ssize_t bytes_read;

    while ((bytes_read = read(client_fd, buffer, sizeof(buffer) - 1)) > 0) {
        buffer[bytes_read] = '\\0';
        printf("[RECEIVED %zd bytes]: %s", bytes_read, buffer);
        write(client_fd, buffer, bytes_read); // Echo back
    }

    printf("[CLIENT] Disconnected. Ready for Milestone 2 (epoll non-blocking loop)!\\n");
    close(client_fd);
    close(server_fd);
    return 0;
}`,
      codeBreakdown: [
        { lines: 'Lines 13-17', concept: 'fcntl Non-blocking Flag', detail: 'Applies `O_NONBLOCK` so read() and write() return immediately with EAGAIN instead of halting the thread.' },
        { lines: 'Lines 25-27', concept: 'SO_REUSEADDR Socket Option', detail: 'Eliminates "Address already in use" bind errors during rapid server restarts.' },
        { lines: 'Lines 33-35', concept: 'Network Byte Order htons()', detail: 'Converts host byte order (little-endian on x86/ARM) to network byte order (big-endian).' },
        { lines: 'Lines 62-66', concept: 'Read & Echo Loop', detail: 'Demonstrates baseline byte echo before adding length-prefixed protocol framing in Milestone 3.' }
      ],
      quickstartCommands: [
        'gcc -Wall -O2 echo_server_starter.c -o echo_server',
        './echo_server',
        '# In a second terminal window:\nnc localhost 9000'
      ],
      expectedOutput: `[SERVER] Listening on 0.0.0.0:9000 (Blocking Echo Baseline)...
[HINT] Connect using: nc localhost 9000
[CLIENT] Connection established! Echoing incoming bytes...
[RECEIVED 6 bytes]: Hello
[CLIENT] Disconnected. Ready for Milestone 2 (epoll non-blocking loop)!`
    },
    milestones: [
      {
        step: 1,
        id: 'raw-socket',
        title: 'Raw TCP Server & Telnet Echo',
        goal: 'Open a raw socket, bind to 0.0.0.0:9000, listen, accept a client, and echo bytes back.',
        specs: [
          'Create the endpoint: Call `int listen_fd = socket(AF_INET, SOCK_STREAM, 0);`. Check that `listen_fd >= 0`.',
          'Enable SO_REUSEADDR: Call `setsockopt(listen_fd, SOL_SOCKET, SO_REUSEADDR, &(int){1}, sizeof(int));` so the port can be rebound immediately if restarted.',
          'Bind to port 9000: Populate `struct sockaddr_in addr;` with `sin_family = AF_INET; sin_port = htons(9000); sin_addr.s_addr = INADDR_ANY;`. Invoke `bind(listen_fd, (struct sockaddr*)&addr, sizeof(addr));`.',
          'Listen: Call `listen(listen_fd, 128);` to configure kernel connection backlog queue.',
          'Accept & Echo: Call `int client_fd = accept(listen_fd, NULL, NULL);`. Read bytes into a buffer with `read(client_fd, buf, sizeof(buf));`, write back with `write(client_fd, buf, bytes_read);`, and close.'
        ],
        syscallsOrConcepts: ['socket()', 'bind()', 'listen()', 'accept()', 'read()', 'write()', 'Network Byte Order (htons)'],
        checkpoint: 'Connect with `nc localhost 9000`, type "Hello", and see "Hello" reflected back.',
        manualHandCheck: 'Verify with `netstat -an | grep 9000` that your process is in LISTEN state.'
      },
      {
        step: 2,
        id: 'non-blocking-epoll',
        title: 'Non-Blocking I/O & epoll Event Loop',
        goal: 'Switch file descriptors to non-blocking and register them with Linux epoll or BSD kqueue.',
        specs: [
          'Configure non-blocking flags: Use `fcntl(fd, F_SETFL, fcntl(fd, F_GETFL, 0) | O_NONBLOCK);` on both `listen_fd` and every accepted client.',
          'Initialize epoll: Call `int epfd = epoll_create1(0);`.',
          'Register interest: Populate `struct epoll_event ev = { .events = EPOLLIN, .data.fd = listen_fd };`. Register using `epoll_ctl(epfd, EPOLL_CTL_ADD, listen_fd, &ev);`.',
          'The event loop: In `while(running)`, call `int n = epoll_wait(epfd, events, MAX_EVENTS, -1);`.',
          'Handle connection bursts: If `events[i].data.fd == listen_fd`, invoke `accept4(..., SOCK_NONBLOCK)` inside a `while(1)` loop until it returns -1 with `errno == EAGAIN` or `EWOULDBLOCK`. Add new clients to epoll.'
        ],
        syscallsOrConcepts: ['fcntl(O_NONBLOCK)', 'epoll_create1()', 'epoll_ctl()', 'epoll_wait()', 'Edge vs Level Triggering'],
        checkpoint: 'Open 5 terminal windows with `nc localhost 9000`; all 5 connect without blocking each other.',
        manualHandCheck: 'Check thread count with `ps -o thcount <pid>`. It must strictly equal 1.'
      },
      {
        step: 3,
        id: 'framing-buffers',
        title: 'Streaming Framing & Ring Buffers',
        goal: 'Solve TCP stream fragmentation: [4-byte big-endian Length][1-byte Opcode][Payload].',
        specs: [
          'Design per-client ring buffer: Allocate a 64KB receive buffer `uint8_t rx_buf[65536]` per connected client struct, tracking `size_t rx_len;`.',
          'Accumulate read bytes: When `EPOLLIN` fires, call `read()` in a loop until `EAGAIN`. Append received bytes to `rx_buf`.',
          'Inspect frame header: If `rx_len >= 5`, read the first 4 bytes as `uint32_t payload_len = ntohl(*(uint32_t*)rx_buf)`. Read byte 4 as `uint8_t opcode`.',
          'Frame dispatch: If `rx_len >= 5 + payload_len`, you have received a complete message! Extract the payload, execute the message handler, and slide remaining bytes forward using `memmove()`.'
        ],
        syscallsOrConcepts: ['TCP Stream vs Datagram', 'Ring Buffer', 'Network Byte Order (ntohl)', 'memmove()'],
        checkpoint: 'Send 100 messages packed in a single write(); server parses exactly 100 distinct messages.',
        manualHandCheck: 'Simulate a slow network sending 1 byte at a time; verify server does not crash or drop bytes.'
      },
      {
        step: 4,
        id: 'broadcast-engine',
        title: 'Rooms & Outbound Write Queues',
        goal: 'Implement room-based chat and non-blocking broadcasts with output write buffers.',
        specs: [
          'Client state management: Store `client_t clients[MAX_CLIENTS]` indexed by socket fd, recording username and current room (e.g. `#general`).',
          'Protocol commands: Define Opcode 0x01 = LOGIN, 0x02 = JOIN, 0x03 = CHAT, 0x04 = WHISPER.',
          'Broadcast fanout: When a chat message arrives, iterate over all clients in the same room. Append the framed message into each peer’s outbound queue `tx_buf`.',
          'Interest toggling: Modify peer epoll registrations to `EPOLLIN | EPOLLOUT`. When `EPOLLOUT` fires, flush `tx_buf` using non-blocking `write()`. Once empty, remove `EPOLLOUT` interest.'
        ],
        syscallsOrConcepts: ['EPOLLOUT Interest Toggling', 'Write Queues', 'Partial Writes', 'Fanout Routing'],
        checkpoint: 'User A in #general broadcasts a message; Users B and C receive it, while User D in #dev does not.',
        manualHandCheck: 'Verify that when broadcasting to 10 clients, if one client socket buffer fills up, write does not block the other 9 clients.'
      }
    ],
    theory: {
      highLevelArchitecture: 'The old way: 1 thread per client, wasting gigabytes on stack frames. The event-driven way: 1 thread asks epoll_wait(): "Which of these 10,000 sockets currently has data ready in its kernel buffer?" epoll_wait() returns an array of ready file descriptors in O(1) time.',
      mentalModel: 'A waiter in a busy restaurant who doesn’t stare at tables, but waits in the center until someone rings a bell. When the bell rings, they immediately serve that table and return to the center.',
      dataStructures: [
        {
          name: 'Framed Wire Protocol Header',
          description: 'Ensures packets can be reassembled cleanly regardless of how the TCP stack fragments them.',
          asciiDiagram: `
+-------------------------------------------------------------+
| Payload Length (uint32_t BE) | Opcode (1B) | Payload...     |
+-------------------------------------------------------------+`
        }
      ],
      keySyscalls: [
        { syscall: 'epoll_create1', signature: 'int epoll_create1(int flags);', purpose: 'Initializes epoll file descriptor.' },
        { syscall: 'epoll_wait', signature: 'int epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout);', purpose: 'Waits for I/O events.' }
      ],
      commonPitfalls: ['Assuming 1 write() == 1 read(): TCP is a continuous byte stream, not a packet stream.'],
      visualizerType: 'socket'
    },
    hints: {
      level1_concept: 'Sockets are just integers representing file descriptors. Never block the event loop; if a write cannot finish, buffer the rest and register EPOLLOUT.',
      level2_architecture: 'Store an array `client_t clients[MAX_FDS]` indexed directly by the socket integer file descriptor for instant O(1) lookups.',
      level3_codeSkeleton: `while (running) {
    int nfds = epoll_wait(epfd, events, 64, -1);
    for (int i = 0; i < nfds; i++) {
        if (events[i].data.fd == listen_fd) accept_clients();
        else handle_client(events[i].data.fd);
    }
}`
    },
    verification: {
      testScenarios: ['Connect 4 netcat terminals and verify broadcast messages arrive in milliseconds.'],
      cliCommands: ['gcc -Wall -O2 server.c -o chat_server', './chat_server 9000'],
      edgeCasesToBreak: ['A client sends a header claiming 4GB length -> must reject before allocating huge memory.']
    }
  },
  {
    id: 'load-balancer',
    title: 'L4 / L7 Reverse Proxy & Load Balancer',
    tagline: 'Engineer an industrial reverse proxy with HTTP parsing, health probes, and connection pooling',
    badge: 'Distributed Systems',
    difficulty: 'Advanced',
    estimatedHours: '30-40 hours',
    category: 'Distributed Systems',
    shortDesc: 'Understand what HAProxy, Envoy, and AWS ALB actually do. Build a high-performance Layer 7 reverse proxy and load balancer from scratch with HTTP/1.1 parsing, health checks, and intelligent traffic routing.',
    accentColor: {
      primary: 'amber',
      gradient: 'from-amber-500 to-orange-500',
      badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      borderHover: 'hover:border-amber-500/50',
      glowShadow: 'rgba(245, 158, 11, 0.15)'
    },
    languages: [
      {
        name: 'Rust',
        tag: 'Rust',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
        why: 'Type-safe state machines and fear-free concurrency for handling multiple backend connection pools.',
        starterTip: 'Model connection states with Rust enums: `enum ConnState { Handshake, Forwarding }`.'
      },
      {
        name: 'Go',
        tag: 'Go',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
        why: 'Goroutines and channels make writing concurrent health-checkers and upstream proxies remarkably clean.',
        starterTip: 'Use `net.Listen` and `io.Copy` for L4, and write a manual HTTP header tokenizer for L7.'
      },
      {
        name: 'C / C++',
        tag: 'C/C++',
        badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        why: 'Enables zero-copy streaming using Linux `splice()` syscall.',
        starterTip: 'Look up `splice(fd_in, NULL, fd_out, NULL, len, SPLICE_F_NONBLOCK)`.'
      }
    ],
    scope: {
      overview: 'Reverse proxies and load balancers insulate backend microservices from the public internet and distribute millions of HTTP requests. In this project, you will build a dual-mode Layer 4 and Layer 7 proxy from scratch.',
      whatYouWillBuild: [
        'A Layer 4 TCP proxy that transparently tunnels raw bytes between client and upstream',
        'A hand-rolled HTTP/1.1 request parser extracting method, path, headers, and host',
        'Three balancing algorithms: Round Robin, Weighted Round Robin, and Least Connections',
        'Asynchronous health-check thread probing `/healthz` endpoints and updating server status',
        'Automatic failover: seamlessly removing unhealthy backends and routing to live nodes'
      ],
      whatYouWontUse: ['NO Nginx, HAProxy, Envoy plugins', 'NO high-level proxy libraries', 'NO cloud black-box load balancers'],
      realWorldComparison: 'The exact technology stack powering Cloudflare, AWS ALB, and Kubernetes Ingress.'
    },
    videoTour: {
      durationSeconds: 630,
      durationFormatted: '10:30',
      title: 'Full ~10-Min Video Tour: Layer 7 Reverse Proxy & Load Balancer',
      overviewSummary: 'In this 10-minute visual tour, learn how Envoy and HAProxy terminate client connections, parse HTTP request streams, balance traffic across upstream nodes, and automatically trigger circuit breaking when a backend crashes.',
      instructorName: 'David R. (Infrastructure Engineer)',
      masterclass: {
        youtubeId: 'vlPCAEUCCa0',
        title: 'How to Write a Reverse Proxy with Go in 25 Minutes',
        author: 'Julien Salleyron (FOSDEM)',
        duration: '26:10',
        description: 'Direct step-by-step solution: building a functional reverse proxy, intercepting HTTP requests, modifying headers, and streaming backend responses.',
        tag: 'Solution Code: Reverse Proxy'
      },
      playlist: [
        {
          youtubeId: 'vlPCAEUCCa0',
          title: 'How to Write a Reverse Proxy with Go in 25 Minutes',
          author: 'Julien Salleyron (FOSDEM)',
          duration: '26:10',
          description: 'Direct step-by-step solution: building a functional reverse proxy, intercepting HTTP requests, modifying headers, and streaming backend responses.',
          tag: 'Solution: Reverse Proxy'
        },
        {
          youtubeId: 'L3_AOFSNKK8',
          title: 'A Load Balancer From Scratch – Low-Level Network Design',
          author: 'Liz Rice (Isovalent / Cloud Native Systems)',
          duration: '22:15',
          description: 'Engineering a high-performance network load balancer from scratch: packet inspection, backend scheduling, and connection tracking.',
          tag: 'Low-Level Network Scheduling'
        },
        {
          youtubeId: 'Fz_YUKu2ZzI',
          title: 'Building a Load Balancer from Scratch (Hands-On Implementation)',
          author: 'Mano Sriram',
          duration: '15:10',
          description: 'Live coding session implementing round-robin scheduling, backend health check pings, and HTTP reverse proxy piping.',
          tag: 'Hands-On Round Robin Code'
        }
      ],
      chapters: [
        {
          timeSeconds: 0,
          timestamp: '00:00',
          title: 'Anatomy of a Modern Reverse Proxy (L4 vs L7)',
          description: 'Understanding the crucial difference between Layer 4 byte piping and Layer 7 HTTP request termination.',
          subtitle: 'Today we are engineering the front door of web infrastructure: a Layer 7 reverse proxy and load balancer.',
          scene: {
            type: 'overview',
            headline: 'Layer 4 (Transport) vs Layer 7 (Application) Proxying',
            visualSnippet: 'L4 Proxy: Tunnels raw TCP bytes blindly (No HTTP inspection).\nL7 Proxy: Terminates HTTP, parses URLs, inspects headers, applies path routing.',
            calloutText: 'Enables smart traffic routing, SSL termination, and rate limiting.'
          }
        },
        {
          timeSeconds: 150,
          timestamp: '02:30',
          title: 'Zero-Copy Stream Piping & HTTP Parsing',
          description: 'How the proxy extracts method, path, and headers without third-party regex libraries.',
          subtitle: 'We read the incoming stream until the double CRLF delimiter, parsing the Request-Line into lightweight string slices.',
          scene: {
            type: 'architecture',
            headline: 'Zero-Copy Request Parsing & Header Injection',
            visualSnippet: 'Inbound Request: "GET /api/v1/products HTTP/1.1\\r\\nHost: example.com\\r\\n\\r\\n"\n  |---> Sliced into: Method="GET", URI="/api/v1/products"\n  |---> Injected Header: "X-Forwarded-For: 203.0.113.19"',
            calloutText: 'Maintains origin client IP address across internal backend networks.'
          }
        },
        {
          timeSeconds: 290,
          timestamp: '04:50',
          title: 'Live Demo: Simulating Backend Node Crashes & Failover',
          description: 'A live demonstration of 3 backend servers with 1 killed, showing zero dropped client requests.',
          subtitle: 'Notice what happens when we kill backend #2. The proxy health check marks it dead in 2 seconds and reroutes 100% of traffic.',
          scene: {
            type: 'demo',
            headline: 'Chaos Engineering: Node Failure & Dynamic Circuit Breaking',
            visualSnippet: '$ curl -s http://localhost:8080/ -> Served by 127.0.0.1:9001\n$ curl -s http://localhost:8080/ -> Served by 127.0.0.1:9002\n[CHAOS] kill -9 $(pgrep -f 9002)\n[HEALTH] Probe failed for :9002 (Connection refused)\n[ROUTER] Backend 9002 marked DEAD. Routing to 9001 and 9003.\n$ curl -s http://localhost:8080/ -> Served by 127.0.0.1:9003 (0 Errors)',
            calloutText: 'Demonstrates resilient automatic failover in distributed systems.'
          }
        },
        {
          timeSeconds: 460,
          timestamp: '07:40',
          title: 'Code Walkthrough: Atomic Round-Robin & Least-Connections',
          description: 'Exploring the concurrency mechanics of atomic counters and least active connection pools.',
          subtitle: 'Using atomic fetch-and-add ensures that multiple worker threads never select the same backend in a race condition.',
          scene: {
            type: 'code',
            headline: 'Thread-Safe Backend Selection Implementation',
            visualSnippet: 'uint32_t idx = atomic_fetch_add(&rr_counter, 1) % NUM_BACKENDS;\nif (backends[idx].is_healthy) {\n    atomic_fetch_add(&backends[idx].active_conn, 1);\n    return &backends[idx];\n}',
            calloutText: 'Guarantees lock-free thread safety under tens of thousands of requests per second.'
          }
        },
        {
          timeSeconds: 560,
          timestamp: '09:20',
          title: 'Connection Pooling & Benchmark Saturation',
          description: 'Reusing persistent TCP sockets to eliminate 3-way handshake latency to backends.',
          subtitle: 'By maintaining an idle pool of open TCP sockets to each upstream server, latency drops by over 60%.',
          scene: {
            type: 'benchmark',
            headline: 'Performance Comparison: Ephemeral vs Persistent Connection Pools',
            visualSnippet: 'Without Pool (New TCP Handshake every req): p99 = 14.8 ms\nWith Keep-Alive Connection Pool:              p99 =  1.9 ms (7.8x faster!)\nThroughput: 18,400 requests/second on standard laptop hardware.',
            calloutText: 'This is the exact optimization powering Cloudflare and AWS ALB.'
          }
        }
      ]
    },
    gettingStarted: {
      prerequisites: [
        'Go 1.21+ or GCC/Clang with POSIX sockets support',
        'curl for dispatching HTTP requests',
        'Python 3 for running mock HTTP backend servers'
      ],
      projectStructure: `load-balancer/
├── main.go
├── config.json
└── mock_backends.py`,
      visualArchitectureImage: {
        caption: 'Layer 7 Load Balancer Pipeline: Health Daemon, Router, and Upstream Pool',
        diagramType: 'Distributed Proxy Topology',
        elements: [
          { id: '1', title: 'Client Listener (:8080)', desc: 'Terminates client HTTP connections and parses request lines.', color: 'amber', role: 'Front Gate' },
          { id: '2', title: 'Routing Engine', desc: 'Selects upstream using Round-Robin, Weighted, or Least-Connections algorithms.', color: 'cyan', role: 'Load Balancer' },
          { id: '3', title: 'Health Monitor Thread', desc: 'Periodically probes /healthz endpoints every 2s and updates status table.', color: 'emerald', role: 'Circuit Breaker' },
          { id: '4', title: 'Upstream Pool (9001, 9002, 9003)', desc: 'Backend microservices handling business logic.', color: 'purple', role: 'Server Pool' }
        ],
        connections: [
          'Clients send HTTP GET -> Listener parses headers -> Routing Engine checks Health Table',
          'Routing Engine picks healthy node -> Injects X-Forwarded-For -> Forwards request',
          'Health Thread detects backend down -> Removes node from table until 2 successful probes'
        ]
      },
      starterFileName: 'proxy_starter.go',
      starterLanguage: 'Go',
      starterCode: `package main

import (
	"fmt"
	"io"
	"net"
	"net/http"
	"sync/atomic"
)

// List of backend servers
var backends = []string{
	"127.0.0.1:9001",
	"127.0.0.1:9002",
	"127.0.0.1:9003",
}

var counter uint64

func handleRequest(w http.ResponseWriter, r *http.Request) {
	// Round Robin Selection
	idx := atomic.AddUint64(&counter, 1) % uint64(len(backends))
	target := backends[idx]

	fmt.Printf("[ROUTER] Forwarding %s %s -> %s\\n", r.Method, r.URL.Path, target)

	// Forward request to backend
	client := &http.Client{}
	outReq, err := http.NewRequest(r.Method, "http://"+target+r.URL.Path, r.Body)
	if err != nil {
		http.Error(w, "Failed to create proxy request", http.StatusInternalServerError)
		return
	}

	// Copy headers and inject X-Forwarded-For
	for k, v := range r.Header {
		outReq.Header[k] = v
	}
	outReq.Header.Set("X-Forwarded-For", r.RemoteAddr)

	resp, err := client.Do(outReq)
	if err != nil {
		http.Error(w, fmt.Sprintf("Backend %s unavailable", target), http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	// Return response to client
	w.WriteHeader(resp.StatusCode)
	io.Copy(w, resp.Body)
}

func main() {
	http.HandleFunc("/", handleRequest)
	port := ":8080"
	fmt.Printf("[PROXY] Load Balancer listening on 0.0.0.0%s (Distributing across %d backends)\\n", port, len(backends))
	if err := http.ListenAndServe(port, nil); err != nil {
		panic(err)
	}
}`,
      codeBreakdown: [
        { lines: 'Lines 11-15', concept: 'Upstream Pool Registry', detail: 'Defines the network addresses of the backend microservice fleet.' },
        { lines: 'Lines 21-23', concept: 'Atomic Round-Robin', detail: 'Uses `atomic.AddUint64` to safely advance index without mutex lock contention.' },
        { lines: 'Lines 38-41', concept: 'Header Forwarding & Injection', detail: 'Copies existing request headers and appends `X-Forwarded-For` with client IP.' },
        { lines: 'Lines 50-52', concept: 'Streaming Response Back', detail: 'Uses `io.Copy` to stream the backend response body directly to the client.' }
      ],
      quickstartCommands: [
        '# Start 3 mock backends in separate terminals:\npython3 -m http.server 9001 &\npython3 -m http.server 9002 &\npython3 -m http.server 9003 &',
        '# Run the load balancer:\ngo run proxy_starter.go',
        '# Send requests to observe round-robin distribution:\ncurl -i http://localhost:8080/'
      ],
      expectedOutput: `[PROXY] Load Balancer listening on 0.0.0.0:8080 (Distributing across 3 backends)
[ROUTER] Forwarding GET / -> 127.0.0.1:9001
[ROUTER] Forwarding GET / -> 127.0.0.1:9002
[ROUTER] Forwarding GET / -> 127.0.0.1:9003`
    },
    milestones: [
      {
        step: 1,
        id: 'l4-tunnel',
        title: 'Layer 4 TCP Pipe Tunnel',
        goal: 'Accept an incoming TCP connection on port 8080 and pipe bytes bi-directionally to a single backend on port 9001.',
        specs: [
          'Listen on port 8080: Bind and listen for incoming client TCP connections.',
          'Connect to upstream: When a client arrives, call `int upstream_fd = socket(...)` and `connect(upstream_fd, "127.0.0.1", 9001);`.',
          'Bi-directional pump: Use `select()` or `poll()` monitoring both `client_fd` and `upstream_fd`. When `client_fd` has data, read and write to `upstream_fd`; when `upstream_fd` has data, read and write to `client_fd`.',
          'Half-closed handling: If one side sends FIN (EOF), call `shutdown(target_fd, SHUT_WR)` to signal EOF to the other side without abruptly aborting in-flight responses.'
        ],
        syscallsOrConcepts: ['TCP Tunneling', 'Full-Duplex Sockets', 'splice() / select()', 'shutdown()'],
        checkpoint: 'Running `curl -x localhost:8080` retrieves the response served by a mock server running on 9001.',
        manualHandCheck: 'Verify that downloading a 50MB file streams without truncating.'
      },
      {
        step: 2,
        id: 'l7-parser',
        title: 'Zero-Dependency HTTP/1.1 Parser & Header Injection',
        goal: 'Parse incoming bytes into HTTP Request Line and Header Key-Value pairs without regex.',
        specs: [
          'Parse Request-Line: Scan the initial line for space delimiters: `<METHOD> <URI> <HTTP-VERSION>\\r\\n`.',
          'Parse Headers: Read subsequent lines until the double CRLF delimiter `\\r\\n\\r\\n`. Split each line by `:` to extract header name and value.',
          'Case-insensitive lookup: Implement case-insensitive comparison (RFC 7230 specifies header names are case-insensitive).',
          'Inject proxy headers: Before forwarding to backend, append `X-Forwarded-For: <client_ip>` and `X-Forwarded-Proto: http` to inform backend microservices of original client identity.'
        ],
        syscallsOrConcepts: ['RFC 7230 / RFC 9112', 'State Machine Parser', 'Zero-Copy Slicing', 'Header Injection'],
        checkpoint: 'Server prints: `Parsed GET /api/v1/users HTTP/1.1 with 6 headers` for any curl request.',
        manualHandCheck: 'Test with mixed-case headers (`cOntEnt-LEngTh`). Ensure case-insensitivity.'
      },
      {
        step: 3,
        id: 'balancing-routing',
        title: 'Routing: Round-Robin & Least-Connections',
        goal: 'Distribute incoming requests across multiple upstream backends.',
        specs: [
          'Define backend pool: Maintain `backend_t backends[3]` with host, port, atomic `active_connections`, and `is_healthy` flag.',
          'Implement Round Robin: Use atomic increment: `size_t idx = atomic_fetch_add(&rr_counter, 1) % NUM_BACKENDS;`. Select `backends[idx]`. If unhealthy, advance to next.',
          'Implement Least Connections: Iterate through healthy backends, find the one with minimum `active_connections`. Increment counter on request start, decrement on connection close.',
          'Error handling: If all backends are marked dead, return `HTTP/1.1 503 Service Unavailable\\r\\n\\r\\n` immediately.'
        ],
        syscallsOrConcepts: ['Atomic Operations', 'Load Balancing Algorithms', 'Least Connections', 'HTTP 503 Fallback'],
        checkpoint: 'Sending 30 requests via `curl` distributes exactly 10 requests to each of the 3 mock backends.',
        manualHandCheck: 'Introduce artificial delay to backend 1; observe Least Connections directing traffic to backends 2 & 3.'
      },
      {
        step: 4,
        id: 'health-checks',
        title: 'Active Health Checks & Circuit Breaker',
        goal: 'Proactively detect dead upstreams and remove them from active routing.',
        specs: [
          'Background health thread: Launch a dedicated timer/thread triggering every 2000ms.',
          'Send HTTP probe: Connect to each upstream backend, send `GET /healthz HTTP/1.1\\r\\nHost: localhost\\r\\nConnection: close\\r\\n\\r\\n`.',
          'Evaluate response: Read response status line. If it contains `200 OK` within 500ms, record probe success; otherwise record failure.',
          'Circuit breaking: If an upstream fails 3 consecutive health probes, mark `is_healthy = false`. Once a dead node responds successfully 2 consecutive times, restore to `is_healthy = true`.'
        ],
        syscallsOrConcepts: ['Health Checking', 'Circuit Breaking', 'Timeout Management', 'Concurrency Locks'],
        checkpoint: 'Kill backend 2; proxy logs `Backend 9002 DOWN` and continues serving requests with 100% success.',
        manualHandCheck: 'Restart backend 2; observe proxy automatically restoring it within 4 seconds.'
      }
    ],
    theory: {
      highLevelArchitecture: 'A Reverse Proxy sits as an intermediary. At Layer 4, it forwards raw bytes. At Layer 7, it terminates HTTP connections, inspects paths, rewrites headers, and dispatches to healthy backend instances.',
      mentalModel: 'An airport coordinator directing passengers to check-in gates. If a counter closes, the coordinator routes travellers to other open counters.',
      dataStructures: [
        {
          name: 'Upstream Backend Struct',
          description: 'Tracks address, weight, active connections, and health state.',
          asciiDiagram: `
+-------------------------------------------------------------+
| host (64B) | port (int) | active_conn (atomic) | is_healthy |
+-------------------------------------------------------------+`
        }
      ],
      keySyscalls: [
        { syscall: 'connect', signature: 'int connect(int sockfd, const struct sockaddr *addr, socklen_t addrlen);', purpose: 'Connects to upstream backends.' },
        { syscall: 'splice', signature: 'ssize_t splice(int fd_in, off64_t *off_in, int fd_out, off64_t *off_out, size_t len, unsigned int flags);', purpose: 'Zero-copy kernel stream piping.' }
      ],
      commonPitfalls: ['Slow upstream starvation: Always set read/write socket timeouts.'],
      visualizerType: 'balancer'
    },
    hints: {
      level1_concept: 'Start by building a 1-to-1 proxy: whatever comes into port 8080 gets forwarded directly to port 9001. Once working, add multiple backends.',
      level2_architecture: 'Split the system into a routing engine and a separate health-monitor thread that periodically pings `/healthz`.',
      level3_codeSkeleton: `backend_t* select_backend_round_robin() {
    uint32_t idx = atomic_fetch_add(&rr_index, 1) % NUM_BACKENDS;
    if (backends[idx].is_healthy) return &backends[idx];
    return find_first_healthy();
}`
    },
    verification: {
      testScenarios: ['Send 300 requests across 3 backends and verify distribution counts.'],
      cliCommands: ['hey -n 1000 -c 50 http://localhost:8080/'],
      edgeCasesToBreak: ['All backends die simultaneously -> must cleanly return HTTP 503 without crashing.']
    }
  },
  {
    id: 'baremetal-blog',
    title: 'Bare-Metal Blogging & Storage Engine',
    tagline: 'Build WordPress/Medium from scratch in C/Go with zero frameworks, raw sockets, and an append-only log',
    badge: 'Fullstack Systems',
    difficulty: 'Intermediate',
    estimatedHours: '20-30 hours',
    category: 'Fullstack Baremetal',
    shortDesc: 'Escape framework bloat. Build a complete publishing platform (WordPress/Medium equivalent) in pure low-level code with raw HTTP serving, custom binary append-only storage, and streaming Markdown parsing.',
    accentColor: {
      primary: 'violet',
      gradient: 'from-violet-500 to-purple-500',
      badgeClass: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
      borderHover: 'hover:border-violet-500/50',
      glowShadow: 'rgba(139, 92, 246, 0.15)'
    },
    languages: [
      {
        name: 'C (C99)',
        tag: 'C',
        badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        why: 'Build a blazing fast web server and binary storage engine consuming under 5MB of RAM.',
        starterTip: 'Use standard POSIX `open`, `write`, `pread` for deterministic database files.'
      },
      {
        name: 'Go',
        tag: 'Go',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
        why: 'Standard library only (`net`, `os`). Proves you do not need Gin, Fiber, or SQLite.',
        starterTip: 'Do not import any 3rd party packages. Stick strictly to standard library.'
      },
      {
        name: 'Rust',
        tag: 'Rust',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
        why: 'Enforce memory safety for your binary file parser and single-pass Markdown tokenizer.',
        starterTip: 'Implement your database as an append-only log with an in-memory BTreeMap index.'
      }
    ],
    scope: {
      overview: 'What is a blogging website really? It is an HTTP server that reads and writes bytes to disk and serves HTML. In this project, you will build an end-to-end Medium/WordPress clone using raw sockets and your own binary database engine.',
      whatYouWillBuild: [
        'A stand-alone HTTP/1.1 server handling `GET` and `POST` routes from scratch',
        'A custom binary append-only database storage engine with in-memory index offsets',
        'A handwritten single-pass Markdown parser converting headings, code, and bold to HTML',
        'Zero-dependency static file server using Linux `sendfile()` for instant streaming'
      ],
      whatYouWontUse: ['NO Express, Django, Rails, Next.js, or WordPress', 'NO SQLite, PostgreSQL, MongoDB, or ORMs', 'NO markdown libraries'],
      realWorldComparison: 'Combines the principles of Redis (append-only log storage) and static site generators.'
    },
    videoTour: {
      durationSeconds: 610,
      durationFormatted: '10:10',
      title: 'Full ~10-Min Video Tour: Baremetal Publishing & Storage Engine',
      overviewSummary: 'In this 10-minute visual walkthrough, discover how an append-only log database achieves O(1) random reads, how single-pass Markdown tokenization works without DOM dependencies, and watch zero-copy static asset streaming deliver 30,000 req/sec.',
      instructorName: 'Elena V. (Fullstack Systems Engineer)',
      masterclass: {
        youtubeId: 'wxcCHvQeZ-U',
        title: 'Algorithms Behind Modern Storage Systems & Append-Only Logs',
        author: 'Alex Petrov (InfoQ / Database Internals)',
        duration: '45:10',
        description: 'Deep dive into storage engine architecture: append-only logs (WAL), B-Trees, LSM trees, and how in-memory indexes query binary disk data.',
        tag: 'Storage Engine Architecture'
      },
      playlist: [
        {
          youtubeId: 'wxcCHvQeZ-U',
          title: 'Algorithms Behind Modern Storage Systems & Append-Only Logs',
          author: 'Alex Petrov (InfoQ / Database Internals)',
          duration: '45:10',
          description: 'Deep dive into storage engine architecture: append-only logs (WAL), B-Trees, LSM trees, and how in-memory indexes query binary disk data.',
          tag: 'Storage Engine Architecture'
        },
        {
          youtubeId: 'H7507eJ4g9s',
          title: 'Write-Ahead Logs (The Most Important Data Structure for Databases)',
          author: 'Database Internals Engineering',
          duration: '12:40',
          description: 'Why databases use append-only write-ahead logs (WAL) to guarantee zero data loss during power failures and achieve fast sequential disk I/O.',
          tag: 'WAL & Crash Recovery'
        },
        {
          youtubeId: 's3hKYMOpp3E',
          title: 'Write-Ahead Logs: The Secret to Fast Database Queries',
          author: 'Systems Architecture',
          duration: '14:25',
          description: 'How append-only storage combined with in-memory indexes allows databases to sustain 50,000 writes/sec without disk bottlenecks.',
          tag: 'Append-Only Disk Performance'
        }
      ],
      chapters: [
        {
          timeSeconds: 0,
          timestamp: '00:00',
          title: 'Escaping the Node Modules Labyrinth',
          description: 'Why modern web publishing pulls in 500MB of dependencies and how to replace it with 1 single binary.',
          subtitle: 'Today we prove you do not need Node.js, Express, or SQLite to build Medium or WordPress.',
          scene: {
            type: 'overview',
            headline: 'The Bloat Collapse: 500MB Dependencies vs 1 Single 3MB Binary',
            visualSnippet: 'Modern Web: Browser -> Nginx -> Gunicorn -> Django -> ORM -> Postgres -> Disk\nBareMetal:  Browser -> [Handcrafted Binary Server] -> Disk File (0.6ms latency)',
            calloutText: 'Pure C or Go standard library running in under 5 megabytes of RAM.'
          }
        },
        {
          timeSeconds: 140,
          timestamp: '02:20',
          title: 'Binary File Format & In-Memory Index Offsets',
          description: 'How Bitcask and Redis append logs sequentially while keeping O(1) random reads.',
          subtitle: 'We append posts sequentially to the end of blog.db, while keeping an in-memory hash table mapping Post ID to byte offset.',
          scene: {
            type: 'architecture',
            headline: 'On-Disk Binary Layout & In-Memory Offset Map',
            visualSnippet: 'blog.db on Disk: [Header 28B][Title "Hello"][Body Markdown...][CRC32 Checksum]\nRAM Index Table: Post #1 -> Offset 0x0000 | Post #2 -> Offset 0x01A0\nRead Operation:  pread(fd, buf, size, offset) -> Single disk seek in 0.04ms!',
            calloutText: 'Sequential disk write is the fastest operation storage drives can perform.'
          }
        },
        {
          timeSeconds: 285,
          timestamp: '04:45',
          title: 'Live Demo: Sub-Millisecond Publishing & sendfile()',
          description: 'Creating articles via curl and browser, observing immediate persistence and zero-copy CSS serving.',
          subtitle: 'Watch as we post a 2,000-word article. The post is written to disk, indexed in memory, and rendered to HTML in 0.8ms.',
          scene: {
            type: 'demo',
            headline: 'Live Article Creation & Instant Static Asset Streaming',
            visualSnippet: '$ curl -X POST -d "title=Systems Mastery&body=# Hello World" http://localhost:8080/api/posts\nHTTP/1.1 201 Created\nLocation: /post/1\n[DB] Appended 420 bytes at offset 0x0000. CRC32: 0x8F4A12BC\n[SENDFILE] Streamed 14.2 KB stylesheet in kernel space without userspace copies.',
            calloutText: 'Shows zero-copy efficiency using Linux sendfile().'
          }
        },
        {
          timeSeconds: 435,
          timestamp: '07:15',
          title: 'Code Walkthrough: Single-Pass Markdown Tokenizer',
          description: 'Converting headings, bold, and code blocks into sanitized HTML without external libraries.',
          subtitle: 'Notice how our finite state machine escapes HTML special characters first to prevent XSS security vulnerabilities.',
          scene: {
            type: 'code',
            headline: 'Streaming Markdown Parser State Machine',
            visualSnippet: 'if (line[0] == \'#\' && line[1] == \' \') {\n    fprintf(out, "<h1>%s</h1>\\n", sanitize_html(line + 2));\n} else {\n    fprintf(out, "<p>%s</p>\\n", parse_inline_markdown(line));\n}',
            calloutText: 'Guarantees fast rendering with zero Cross-Site Scripting (XSS) risks.'
          }
        },
        {
          timeSeconds: 540,
          timestamp: '09:00',
          title: 'Saturation Benchmark: 30,000 Requests/Sec',
          description: 'Benchmarking the blog server with wrk and demonstrating crash-resistant recovery.',
          subtitle: 'When we kill the process and restart it, the binary file is scanned in milliseconds to restore the entire database.',
          scene: {
            type: 'benchmark',
            headline: 'Benchmark Run: 10,000 Concurrent Requests via wrk',
            visualSnippet: '$ wrk -t4 -c100 -d10s http://localhost:8080/\nRequests/sec: 32,410.82\nLatency Avg:   0.74 ms (p99: 1.8 ms)\nRAM Usage:     4.8 MB Total',
            calloutText: 'Proves high-performance web systems do not need bloated framework stacks.'
          }
        }
      ]
    },
    gettingStarted: {
      prerequisites: [
        'C compiler (GCC/Clang) or Go',
        'curl for API endpoint testing',
        'Web browser for viewing generated blog posts'
      ],
      projectStructure: `baremetal-blog/
├── server.c
├── storage.c
├── markdown.c
├── blog.db
└── static/
    └── style.css`,
      visualArchitectureImage: {
        caption: 'Baremetal Publishing Architecture: HTTP Server, Markdown Engine, and Append-Only Storage',
        diagramType: 'Fullstack Storage & Web Architecture',
        elements: [
          { id: '1', title: 'HTTP/1.1 Server', desc: 'Accepts browser requests on :8080 and routes GET/POST endpoints.', color: 'violet', role: 'Web Server' },
          { id: '2', title: 'Single-Pass Markdown FSM', desc: 'Transforms user markdown text into sanitized, typography-rich HTML.', color: 'emerald', role: 'Parser' },
          { id: '3', title: 'In-Memory Offset Index', desc: 'Fast hash table mapping Post IDs to 64-bit disk byte offsets.', color: 'cyan', role: 'RAM Index' },
          { id: '4', title: 'Append-Only Log (blog.db)', desc: 'Sequential on-disk binary records with packed headers and CRC32 checksums.', color: 'amber', role: 'Persistent Storage' }
        ],
        connections: [
          'Browser sends POST /api/posts -> Server packs binary record -> Appends to blog.db',
          'Server updates In-Memory Index -> Returns HTTP 201 Created with post URL',
          'Browser sends GET /post/1 -> Server reads offset from RAM -> pread() from blog.db'
        ]
      },
      starterFileName: 'blog_starter.c',
      starterLanguage: 'C',
      starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/socket.h>
#include <netinet/in.h>

#define PORT 8080

// Minimal HTTP Response Sender
void send_response(int client_fd, int status, const char* content_type, const char* body) {
    char header[512];
    int body_len = strlen(body);
    int header_len = snprintf(header, sizeof(header),
        "HTTP/1.1 %d OK\\r\\n"
        "Content-Type: %s; charset=utf-8\\r\\n"
        "Content-Length: %d\\r\\n"
        "Connection: close\\r\\n"
        "Server: BareMetalBlog/1.0\\r\\n"
        "\\r\\n",
        status, content_type, body_len);

    write(client_fd, header, header_len);
    write(client_fd, body, body_len);
}

int main() {
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &(int){1}, sizeof(int));

    struct sockaddr_in addr = {
        .sin_family = AF_INET,
        .sin_addr.s_addr = INADDR_ANY,
        .sin_port = htons(PORT)
    };

    bind(server_fd, (struct sockaddr*)&addr, sizeof(addr));
    listen(server_fd, 64);
    printf("[BLOG] Server listening on http://localhost:%d\\n", PORT);

    while (1) {
        int client_fd = accept(server_fd, NULL, NULL);
        if (client_fd < 0) continue;

        char request[2048];
        ssize_t bytes = read(client_fd, request, sizeof(request) - 1);
        if (bytes > 0) {
            request[bytes] = '\\0';
            printf("[HTTP REQUEST] %s\\n", strtok(request, "\\r\\n"));

            const char* html_page = 
                "<!DOCTYPE html><html><head><title>BareMetal Blog</title>"
                "<style>body{font-family:sans-serif;max-width:700px;margin:50px auto;background:#0d1117;color:#c9d1d9;}</style>"
                "</head><body>"
                "<h1>Handcrafted Blog Platform</h1>"
                "<p>Built entirely from scratch with zero framework bloat.</p>"
                "</body></html>";

            send_response(client_fd, 200, "text/html", html_page);
        }
        close(client_fd);
    }
    return 0;
}`,
      codeBreakdown: [
        { lines: 'Lines 10-23', concept: 'Raw HTTP Header Formatter', detail: 'Formats standard HTTP/1.1 status lines, Content-Type, and Content-Length headers.' },
        { lines: 'Lines 41-47', concept: 'Request-Line Extraction', detail: 'Reads incoming HTTP request stream and logs the method and path.' },
        { lines: 'Lines 49-55', concept: 'Self-Contained HTML Response', detail: 'Delivers responsive HTML without external web framework dependencies.' }
      ],
      quickstartCommands: [
        'gcc -Wall -O2 blog_starter.c -o blog_server',
        './blog_server',
        '# In your browser, navigate to:\nhttp://localhost:8080'
      ],
      expectedOutput: `[BLOG] Server listening on http://localhost:8080
[HTTP REQUEST] GET / HTTP/1.1
[HTTP REQUEST] GET /favicon.ico HTTP/1.1`
    },
    milestones: [
      {
        step: 1,
        id: 'http-router',
        title: 'Raw Sockets HTTP Server & Routing',
        goal: 'Open a listening socket and route HTTP requests by method and path without any framework.',
        specs: [
          'Listen on port 8080: Open a raw TCP socket, bind to `0.0.0.0:8080`, and listen.',
          'Extract HTTP method and URL: Parse the incoming request header line to read the method (`GET`, `POST`) and target path (`/`, `/api/posts`, `/static/style.css`).',
          'Route Dispatcher: Create a lookup table mapping `(method, path)` pairs to handler function pointers.',
          'Format HTTP response: Construct the response buffer: `HTTP/1.1 200 OK\\r\\nContent-Type: text/html; charset=utf-8\\r\\nContent-Length: <size>\\r\\n\\r\\n<HTML_BODY>`.'
        ],
        syscallsOrConcepts: ['Socket API', 'HTTP Response Headers', 'Route Dispatching'],
        checkpoint: 'Visiting `http://localhost:8080/` displays your custom HTML greeting page.',
        manualHandCheck: 'Verify curl reports clean HTTP status codes: `curl -I http://localhost:8080/`.'
      },
      {
        step: 2,
        id: 'append-only-db',
        title: 'Binary Append-Only Storage Engine',
        goal: 'Design and implement a custom binary database file (`blog.db`) storing blog posts on disk.',
        specs: [
          'Define the binary record format: Pack records sequentially: `[8-byte uint64_t ID][8-byte uint64_t Timestamp][4-byte uint32_t TitleLen][Title bytes][4-byte uint32_t BodyLen][Body bytes][4-byte uint32_t CRC32]`.',
          'Append on write: When a post is created, call `int fd = open("blog.db", O_WRONLY | O_CREAT | O_APPEND, 0644);` and write the byte record to end of file.',
          'Build in-memory index on boot: On server startup, open `blog.db` in read mode. Sequentially scan the headers, jumping forward by `(28 + title_len + body_len)` bytes to populate an in-memory hash table: `ID -> file_offset`.',
          'O(1) random reads: To read a post by ID, lookup its offset in RAM and invoke `pread(db_fd, buf, size, offset)`. No seek race conditions!'
        ],
        syscallsOrConcepts: ['Binary File Formats', 'Append-Only Logs', 'pread() & lseek()', 'CRC32 Checksums'],
        checkpoint: 'Create 10 posts, restart server; all 10 posts load instantly from the binary file.',
        manualHandCheck: 'Open `blog.db` in `hexdump -C blog.db` to inspect the binary records.'
      },
      {
        step: 3,
        id: 'markdown-parser',
        title: 'Hand-Crafted Streaming Markdown Parser',
        goal: 'Convert user-written Markdown `# Heading`, `**bold**`, and code into HTML without external libraries.',
        specs: [
          'Line-by-line state machine: Read input text line by line.',
          'Headings: If line starts with `# `, wrap remainder in `<h1>`; if `## `, wrap in `<h2>`; if `### `, wrap in `<h3>`.',
          'Inline bold and code: Scan for `**text**` and convert to `<strong>text</strong>`. Scan for backticks `` `code` `` and convert to `<code>code</code>`.',
          'Crucial security sanitization: Before generating HTML tags, replace all literal `<`, `>`, and `&` in user input with `&lt;`, `&gt;`, and `&amp;` to prevent Cross-Site Scripting (XSS) vulnerabilities.'
        ],
        syscallsOrConcepts: ['Lexical Analysis', 'Finite State Machine', 'XSS Prevention', 'HTML Sanitization'],
        checkpoint: 'A post submitted with Markdown displays rendered HTML with typography and headings.',
        manualHandCheck: 'Submit `<script>alert(1)</script>` in Markdown; ensure it renders safely as escaped text.'
      },
      {
        step: 4,
        id: 'sendfile-assets',
        title: 'Static Asset Serving via Zero-Copy sendfile()',
        goal: 'Serve CSS stylesheets and images directly from disk to the network card without userspace copying.',
        specs: [
          'Route matching: Intercept requests starting with `/static/`. Prevent directory traversal attacks by rejecting any path containing `..`.',
          'Open file: Call `int file_fd = open(filepath, O_RDONLY);`.',
          'Inspect size: Invoke `struct stat st; fstat(file_fd, &st);` to retrieve exact file size.',
          'Write header & stream: Send `Content-Length: <size>\\r\\n\\r\\n`. Then call `sendfile(client_fd, file_fd, NULL, st.st_size);` to stream file contents entirely in kernel space.'
        ],
        syscallsOrConcepts: ['sendfile()', 'fstat()', 'Path Traversal Prevention', 'Kernel Zero-Copy'],
        checkpoint: 'CSS styles load instantly; response header shows exact byte size matching file on disk.',
        manualHandCheck: 'Trace with `strace -e sendfile ./server` to verify zero userspace memory copies.'
      }
    ],
    theory: {
      highLevelArchitecture: 'Instead of (Browser -> Nginx -> Gunicorn -> Django -> ORM -> PostgreSQL -> Disk), it is simply (Browser -> Handcrafted Binary -> Disk). Sequential disk writes are the fastest operation a storage drive can perform.',
      mentalModel: 'A library where new books are pasted at the end of the shelf (Append-Only Log), and coordinate index cards are kept in an open drawer (RAM Index).',
      dataStructures: [
        {
          name: 'On-Disk Post Record Layout',
          description: 'A packed binary format stored directly in the database file.',
          asciiDiagram: `
+-------------------------------------------------------------+
| ID (8B) | Timestamp (8B) | TitleLen (4B) | Title (var)      |
| BodyLen (4B) | Body (var) | CRC32 Checksum (4B)             |
+-------------------------------------------------------------+`
        }
      ],
      keySyscalls: [
        { syscall: 'pread', signature: 'ssize_t pread(int fd, void *buf, size_t count, off_t offset);', purpose: 'Thread-safe random offset file reads.' },
        { syscall: 'sendfile', signature: 'ssize_t sendfile(int out_fd, int in_fd, off_t *offset, size_t count);', purpose: 'Kernel zero-copy file streaming.' }
      ],
      commonPitfalls: ['XSS vulnerabilities: Always sanitize user HTML tags.'],
      visualizerType: 'blog'
    },
    hints: {
      level1_concept: 'HTTP is just plain text ending with two newlines (\\r\\n\\r\\n). You do not need any libraries to construct strings!',
      level2_architecture: 'Store posts sequentially in `blog.db`. Keep an in-memory hash table of `id -> file_offset`.',
      level3_codeSkeleton: `void send_response(int fd, const char* body) {
    char header[256];
    sprintf(header, "HTTP/1.1 200 OK\\r\\nContent-Length: %d\\r\\n\\r\\n", (int)strlen(body));
    write(fd, header, strlen(header));
    write(fd, body, strlen(body));
}`
    },
    verification: {
      testScenarios: ['Benchmark with `hey -n 5000 -c 50 http://localhost:8080/` and achieve < 1ms response latency.'],
      cliCommands: ['gcc -O2 blog_server.c -o blog_server', './blog_server'],
      edgeCasesToBreak: ['Static file path traversal attempt `GET /static/../../../../etc/passwd` -> must reject with 403.']
    }
  },
  {
    id: 'git-from-scratch',
    title: 'Git Version Control From Scratch',
    tagline: 'Understand the directed acyclic graph (DAG) of Blobs, Trees, and Commits behind Git',
    badge: 'Developer Tools',
    difficulty: 'Intermediate',
    estimatedHours: '15-25 hours',
    category: 'Developer Tools',
    shortDesc: 'Stop seeing Git as magic command invocations. Build a working clone of git (init, hash-object, cat-file, write-tree, commit-tree, log, checkout) using SHA-1 hashing, zlib compression, and content-addressable storage.',
    accentColor: {
      primary: 'orange',
      gradient: 'from-orange-500 to-amber-500',
      badgeClass: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
      borderHover: 'hover:border-orange-500/50',
      glowShadow: 'rgba(249, 115, 22, 0.15)'
    },
    languages: [
      {
        name: 'Python',
        tag: 'Python',
        badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        why: 'Standard library `hashlib` and `zlib` let you focus purely on Git’s object model without C memory overhead.',
        starterTip: 'Inspect raw Git objects using Python’s `zlib.decompress(open(".git/objects/..", "rb").read())`.'
      },
      {
        name: 'Rust',
        tag: 'Rust',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
        why: 'Strong types for Git objects (`enum GitObject { Blob(Vec<u8>), Tree(Vec<TreeEntry>), Commit(...) }`).',
        starterTip: 'Use `sha1` and `flate2` crates for content-addressable storage.'
      },
      {
        name: 'C',
        tag: 'C',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        why: 'Linus Torvalds originally wrote Git in ~1,000 lines of C in 10 days. Replicate the master.',
        starterTip: 'Link against `libz` for zlib deflate/inflate routines.'
      }
    ],
    scope: {
      overview: 'Git is not a complex mystery: it is simply an immutable content-addressable key-value store with a directed acyclic graph (DAG) on top. In this project, you will write a CLI that reads and writes real `.git` repositories that the official `git` command can inspect!',
      whatYouWillBuild: [
        '`my_git init`: creates `.git/objects` and `.git/refs/heads`',
        '`my_git hash-object`: hashes content with SHA-1 header `blob <size>\\0<data>`, deflates with zlib, writes to `.git/objects/xx/yyyy...`',
        '`my_git cat-file -p <hash>`: inspects object contents and types',
        '`my_git write-tree`: converts directory tree into binary tree objects',
        '`my_git commit-tree`: creates commit pointing to tree and parent commit',
        'Compatibility: official `git log` and `git status` recognize your handcrafted commits!'
      ],
      whatYouWontUse: ['NO libgit2 or git2-rs', 'NO executing official `git` CLI subprocesses', 'NO AI copilot generation'],
      realWorldComparison: 'This is the exact data structure powering GitHub, GitLab, and the software development lifecycle worldwide.'
    },
    videoTour: {
      durationSeconds: 625,
      durationFormatted: '10:25',
      title: 'Full ~10-Min Video Tour: Building Git From Scratch',
      overviewSummary: 'In this 10-minute visual tour, demystify Git by seeing how Blobs, Trees, and Commits form an immutable Directed Acyclic Graph (DAG) in `.git/objects`, and watch official git commands inspect our handcrafted commits.',
      instructorName: 'Marcus T. (VCS Specialist)',
      masterclass: {
        youtubeId: 'g2cfjDENSyw',
        title: 'I Built My Own Git From Scratch (Step-by-Step Tutorial)',
        author: 'Rivaan Ranawat',
        duration: '4h 50m',
        description: 'Complete hands-on code solution: implementing git init, hash-object, cat-file, write-tree, and commit-tree from scratch in code.',
        tag: 'Full Solution: Git CLI Commands'
      },
      playlist: [
        {
          youtubeId: 'g2cfjDENSyw',
          title: 'I Built My Own Git From Scratch (Step-by-Step Tutorial)',
          author: 'Rivaan Ranawat',
          duration: '4h 50m',
          description: 'Complete hands-on code solution: implementing git init, hash-object, cat-file, write-tree, and commit-tree from scratch in code.',
          tag: 'Solution: Git CLI Commands'
        },
        {
          youtubeId: 'BPTArKh2apg',
          title: 'Git Commit Objects: Build a Commit by Hand with git commit-tree',
          author: 'The Modern SDE (Git Internals Course)',
          duration: '17:20',
          description: 'Deconstruct Git plumbing from scratch: inspect raw blob hashes, construct tree objects, and link commit parent pointers manually.',
          tag: 'Handcrafted Commit Objects'
        },
        {
          youtubeId: 'P6jD966jzlk',
          title: 'Git Internals: How Git Works - Fear Not The SHA!',
          author: 'GitLab Official Architecture',
          duration: '28:15',
          description: 'GitLab engineering masterclass on content-addressable storage, object hashing, compression, and Git DAG traversal under the hood.',
          tag: 'Git Object Model & DAG'
        }
      ],
      chapters: [
        {
          timeSeconds: 0,
          timestamp: '00:00',
          title: 'Demystifying Git: It Is Just Content-Addressable Storage',
          description: 'Why Git is not a mystery diff machine, but an immutable key-value database keyed by SHA-1 hashes.',
          subtitle: 'Welcome! Today we are building Git with our own hands—proving that commits and branches are remarkably simple data structures.',
          scene: {
            type: 'overview',
            headline: 'Git is Simply a Key-Value Store Keyed by SHA-1 Hashes',
            visualSnippet: 'Key:   40-Character Hexadecimal SHA-1 Hash (e.g. 4b825dc642cb6eb9a060e54bf8d69288fbee4904)\nValue: Zlib-Compressed Object: "<type> <size>\\0<binary_payload>"',
            calloutText: 'GitHub and official Git use this exact on-disk byte layout.'
          }
        },
        {
          timeSeconds: 130,
          timestamp: '02:10',
          title: 'The Four Git Objects: Blobs, Trees, Commits, and Tags',
          description: 'How files become Blobs, folders become binary Trees, and snapshots become Commits.',
          subtitle: 'Every file you commit becomes a Blob object. If two files have the same content, Git stores only one blob.',
          scene: {
            type: 'architecture',
            headline: 'The Git Object DAG (Directed Acyclic Graph)',
            visualSnippet: '[Commit: 7a8f901] ---> Tree: 3b18e51 ("root/")\n                             |\n                +------------+------------+\n                v                         v\n        [Blob: e69de29]            [Tree: c42f109] ("src/")\n        ("README.md")                     |\n                                          v\n                                   [Blob: a810bf2] ("main.c")',
            calloutText: 'Trees store raw 20-byte binary SHA-1 hashes and file permission modes.'
          }
        },
        {
          timeSeconds: 270,
          timestamp: '04:30',
          title: 'Live Demo: Creating Blobs & Commits Inspected by Official Git',
          description: 'Writing custom blobs and commits to `.git/objects` and running official `git log` to verify.',
          subtitle: 'Watch as we execute my_git commit, then open standard terminal git log to see our author name and timestamp appear.',
          scene: {
            type: 'demo',
            headline: 'Official Git Interoperability Verification',
            visualSnippet: '$ python3 my_git.py commit "Handcrafted commit from scratch"\nCreated commit: 8f921da84c\n$ git log --oneline\n8f921da (HEAD -> main) Handcrafted commit from scratch\n$ git status\nOn branch main\nnothing to commit, working tree clean',
            calloutText: 'Proves 100% binary compatibility with the official Git tooling.'
          }
        },
        {
          timeSeconds: 425,
          timestamp: '07:05',
          title: 'Code Walkthrough: Binary Tree Serialization & zlib',
          description: 'Examining the exact sorting requirements and null-byte delimiters in tree objects.',
          subtitle: 'A common pitfall is forgetting that Git strictly requires tree entries to be sorted alphabetically by filename.',
          scene: {
            type: 'code',
            headline: 'Tree Entry Formatting & Binary Hash Packing',
            visualSnippet: 'def write_tree(entries):\n    entries.sort(key=lambda e: e.name)\n    buf = bytearray()\n    for e in entries:\n        buf += f"{e.mode} {e.name}\\0".encode()\n        buf += bytes.fromhex(e.sha1) # 20 raw bytes',
            calloutText: 'Incorrect entry sorting breaks the SHA-1 tree hash calculation.'
          }
        },
        {
          timeSeconds: 555,
          timestamp: '09:15',
          title: 'Branch Refs & Summary Wrap-Up',
          description: 'How branches are just 41-byte text files in `.git/refs/heads/`.',
          subtitle: 'Remember: a branch is not a container of commits; it is literally just a text file with a 40-character commit hash.',
          scene: {
            type: 'benchmark',
            headline: 'VCS Internal Footprint Verification',
            visualSnippet: '.git/refs/heads/main:  41 bytes (40-char hash + newline)\n.git/HEAD:             23 bytes ("ref: refs/heads/main\\n")\nZero magic. Pure mathematical graph theory.',
            calloutText: 'You now understand Git more deeply than 99% of professional developers.'
          }
        }
      ]
    },
    gettingStarted: {
      prerequisites: [
        'Python 3.8+ (or Rust / C with zlib)',
        'Official `git` CLI installed for compatibility testing',
        'Standard terminal shell'
      ],
      projectStructure: `my_git/
├── my_git.py
└── test_repo/
    ├── README.md
    └── .git/
        ├── HEAD
        ├── objects/
        └── refs/heads/`,
      visualArchitectureImage: {
        caption: 'Git Object Model: Blobs, Directory Trees, Commit Snapshots, and Branch References',
        diagramType: 'Content-Addressable Object DAG',
        elements: [
          { id: '1', title: 'Blob Object', desc: 'Raw file content compressed with zlib. Prepended with `blob <size>\\0`.', color: 'orange', role: 'File Data' },
          { id: '2', title: 'Tree Object', desc: 'Directory index mapping filenames to permissions (100644) and 20-byte SHA-1 hashes.', color: 'emerald', role: 'Directory Structure' },
          { id: '3', title: 'Commit Object', desc: 'Snapshot metadata pointing to root Tree, parent commit, author, timestamp, and message.', color: 'purple', role: 'Snapshot DAG' },
          { id: '4', title: 'Branch Ref (HEAD)', desc: 'Text file in .git/refs/heads/main storing current 40-character commit hash.', color: 'cyan', role: 'Branch Pointer' }
        ],
        connections: [
          'Files in working directory -> Hashed into Blobs in .git/objects/xx/',
          'Directory scan -> Serialized into Tree Objects pointing to Blobs',
          'Commit created -> Points to Tree -> Updates .git/refs/heads/main'
        ]
      },
      starterFileName: 'my_git_starter.py',
      starterLanguage: 'Python',
      starterCode: `import sys
import os
import hashlib
import zlib

def init():
    os.makedirs(".git/objects", exist_ok=True)
    os.makedirs(".git/refs/heads", exist_ok=True)
    with open(".git/HEAD", "w") as f:
        f.write("ref: refs/heads/main\\n")
    print("Initialized empty Git repository in .git/")

def hash_object(filepath, write=True):
    with open(filepath, "rb") as f:
        content = f.read()

    # Prepend Git header: "blob <size>\\0<data>"
    header = f"blob {len(content)}\\0".encode('utf-8')
    full_data = header + content

    # Calculate 40-character SHA-1 hexadecimal hash
    sha1 = hashlib.sha1(full_data).hexdigest()

    if write:
        # Store in .git/objects/xx/yyyy...
        obj_dir = os.path.join(".git/objects", sha1[:2])
        obj_path = os.path.join(obj_dir, sha1[2:])
        os.makedirs(obj_dir, exist_ok=True)
        with open(obj_path, "wb") as f:
            f.write(zlib.compress(full_data))

    return sha1

def cat_file(sha1):
    obj_path = os.path.join(".git/objects", sha1[:2], sha1[2:])
    if not os.path.exists(obj_path):
        print(f"Error: Object {sha1} not found")
        return

    with open(obj_path, "rb") as f:
        decompressed = zlib.decompress(f.read())

    # Find the null byte delimiter
    null_idx = decompressed.index(b'\\0')
    header = decompressed[:null_idx].decode('utf-8')
    obj_type, size = header.split(' ')
    payload = decompressed[null_idx + 1:]

    print(f"[OBJECT TYPE: {obj_type}, SIZE: {size} bytes]")
    sys.stdout.buffer.write(payload)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 my_git.py [init | hash-object <file> | cat-file <hash>]")
        sys.exit(1)

    cmd = sys.argv[1]
    if cmd == "init":
        init()
    elif cmd == "hash-object" and len(sys.argv) >= 3:
        h = hash_object(sys.argv[2], write=True)
        print(f"Computed SHA-1 Blob Hash: {h}")
    elif cmd == "cat-file" and len(sys.argv) >= 3:
        cat_file(sys.argv[2])
    else:
        print("Unknown command.")`,
      codeBreakdown: [
        { lines: 'Lines 6-11', concept: 'Repository Initialization', detail: 'Creates the required `.git/objects` and `.git/refs/heads` directory structure and sets HEAD.' },
        { lines: 'Lines 17-22', concept: 'Blob Header Construction', detail: 'Prepends `blob <size>\\0` before raw data bytes; computes standard SHA-1 digest.' },
        { lines: 'Lines 25-30', concept: 'zlib Object Compression', detail: 'Deflates object and stores in 2-character subfolder within `.git/objects/`.' },
        { lines: 'Lines 34-47', concept: 'zlib Decompression & Parsing', detail: 'Inflates object file, locates null byte delimiter, and inspects object type and size.' }
      ],
      quickstartCommands: [
        'python3 my_git_starter.py init',
        'echo "Hello Handcrafted Git" > sample.txt',
        'python3 my_git_starter.py hash-object sample.txt',
        '# Verify with official git CLI:\ngit cat-file -p <computed_hash>'
      ],
      expectedOutput: `Initialized empty Git repository in .git/
Computed SHA-1 Blob Hash: 4b825dc642cb6eb9a060e54bf8d69288fbee4904
[OBJECT TYPE: blob, SIZE: 23 bytes]
Hello Handcrafted Git`
    },
    milestones: [
      {
        step: 1,
        id: 'git-init-blob',
        title: 'Git Init & Blob Object Storage',
        goal: 'Initialize the `.git` directory structure and implement `hash-object` to store raw blobs.',
        specs: [
          'Create folder structure: Create directories `.git/objects/` and `.git/refs/heads/`. Write the default ref file `.git/HEAD` containing `ref: refs/heads/main\\n`.',
          'Construct Git object header: Read file contents into a byte buffer. Prepend the Git header: `blob <byte_length>\\0<raw_bytes>`. The null byte `\\0` is mandatory.',
          'Calculate 40-character SHA-1: Compute the SHA-1 digest of the entire `blob <len>\\0<content>` payload. Format as a 40-character hexadecimal string.',
          'Compress and write to disk: Use zlib deflate to compress the entire payload. Take the first 2 characters of the hash as the folder name (e.g. `.git/objects/4b/`), and the remaining 38 characters as the filename. Write the compressed bytes to disk.'
        ],
        syscallsOrConcepts: ['Content-Addressable Storage', 'SHA-1 Hashing', 'zlib Deflate/Inflate', 'POSIX File Permissions'],
        checkpoint: 'Running `my_git hash-object -w file.txt` yields the exact same hash as `git hash-object -w file.txt`.',
        manualHandCheck: 'Verify that the official `git cat-file -p <hash>` successfully reads your blob!'
      },
      {
        step: 2,
        id: 'git-cat-file',
        title: 'Object Deserialization & cat-file',
        goal: 'Read any object hash from `.git/objects`, inflate it with zlib, and extract its type and payload.',
        specs: [
          'Locate object file: Given a 40-character hash, resolve path `.git/objects/<hash[0:2]>/<hash[2:]>`.',
          'Decompress with zlib: Read compressed bytes from disk and inflate into memory.',
          'Parse object header: Scan through the uncompressed buffer until the space character to extract object type (`blob`, `tree`, `commit`). Continue reading until the null byte `\\0` to extract object size as an integer.',
          'Extract & output payload: Slice the remaining bytes after the null byte. If `-p` flag is passed, print the raw payload to stdout.'
        ],
        syscallsOrConcepts: ['zlib Inflate', 'Binary Buffer Parsing', 'Header Demultiplexing'],
        checkpoint: '`my_git cat-file -p <hash>` prints the file contents to terminal.',
        manualHandCheck: 'Test with both small 10-byte strings and 1MB images.'
      },
      {
        step: 3,
        id: 'git-tree',
        title: 'Tree Objects & Directory Snapshots',
        goal: 'Scan the working directory and generate binary Git tree objects representing folder hierarchies.',
        specs: [
          'Scan files: Read current directory entries (ignoring `.git`). For each file, hash its contents into a blob object.',
          'Format tree entries: Each entry consists of: `<mode_octal> <filename>\\0<20_byte_binary_sha1>`. For regular files, mode is `100644`; for executable files, `100755`; for subdirectories, `40000`.',
          'Crucial sorting requirement: Git requires tree entries to be sorted strictly alphabetically by entry name (directories are compared with trailing `/`). Sorting improperly causes hash mismatches!',
          'Convert hash to binary: Convert the 40-character hexadecimal SHA-1 string into 20 raw binary bytes (using `bytes.fromhex` or hex decoding).',
          'Serialize tree object: Concatenate all entries, prepend header `tree <total_length>\\0`, deflate with zlib, and write to `.git/objects/`.'
        ],
        syscallsOrConcepts: ['Binary Serialization', 'Directory Traversal', 'Tree DAG', 'Hexadecimal Decoding'],
        checkpoint: '`git ls-tree <hash>` from the official Git CLI renders your tree structure perfectly.',
        manualHandCheck: 'Assert that subdirectories recursively create nested tree objects.'
      },
      {
        step: 4,
        id: 'git-commit',
        title: 'Commit Objects & Branch Updating',
        goal: 'Create commit objects pointing to tree hashes and parent commits, updating `refs/heads/main`.',
        specs: [
          'Format commit payload: Construct plain text: `tree <tree_40_char_hash>\\n`. If a parent commit exists, add `parent <parent_hash>\\n`. Add author line: `author Your Name <you@domain.com> <epoch_time> +0000\\n`. Add committer line matching author. Add empty newline `\\n`, then the commit message.',
          'Serialize commit object: Prepend header `commit <payload_length>\\0`, compute SHA-1, deflate with zlib, and write to `.git/objects/`.',
          'Update branch reference: Write the 40-character commit hash followed by a newline into `.git/refs/heads/main`.',
          'Verify with official git: Run `git log` and `git status`. Observe that official Git displays your handcrafted commit in the history!'
        ],
        syscallsOrConcepts: ['Directed Acyclic Graphs (DAG)', 'Branch Pointers', 'Epoch Timestamps', 'Commit Metadata'],
        checkpoint: 'Running official `git log` renders your handcrafted commit history with author, date, and messages.',
        manualHandCheck: 'Create 3 sequential commits; run `git log --graph` to see the connected graph.'
      }
    ],
    theory: {
      highLevelArchitecture: 'Git has only four fundamental object types: Blobs (raw file bytes), Trees (directories mapping filenames to blob/tree hashes), Commits (pointers to a root tree, parent commits, author, timestamp, and message), and Tags (annotated labels). Every object is referenced purely by the cryptographic hash of its contents.',
      mentalModel: 'Imagine a giant warehouse where every box has a barcode stamped on it that is literally calculated from whatever is packed inside. If you change a single comma, the barcode changes completely. That’s content-addressable storage.',
      dataStructures: [
        {
          name: 'Git Object Format on Disk',
          description: 'Every git object starts with a human-readable type, space, length in decimal, null byte, then payload.',
          asciiDiagram: `
+-------------------------------------------------------------+
| "<type> <length>\\0" | <raw binary content payload>          |
+-------------------------------------------------------------+`
        }
      ],
      keySyscalls: [
        { syscall: 'open', signature: 'int open(const char *path, int flags);', purpose: 'Opens object files in .git directory.' },
        { syscall: 'mkdir', signature: 'int mkdir(const char *pathname, mode_t mode);', purpose: 'Creates 2-character subdirectories in .git/objects/.' }
      ],
      commonPitfalls: ['Forgetting null byte `\\0`: The header must terminate with a null byte before payload bytes.'],
      visualizerType: 'git'
    },
    hints: {
      level1_concept: 'Never think of Git as differences (diffs). Git stores full snapshots of files as blobs. If a file didn’t change in a new commit, the new tree simply reuses the exact same SHA-1 hash!',
      level2_architecture: 'Store SHA-1 hashes as 20 raw bytes inside tree objects, but as 40 hexadecimal characters when printing to terminal or naming file paths.',
      level3_codeSkeleton: `def hash_object(data, obj_type="blob"):
    header = f"{obj_type} {len(data)}\\0".encode('utf-8')
    full_data = header + data
    sha = hashlib.sha1(full_data).hexdigest()
    path = f".git/objects/{sha[:2]}/{sha[2:]}"
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as f:
        f.write(zlib.compress(full_data))
    return sha`
    },
    verification: {
      testScenarios: ['Initialize a repo with `my_git`, add 3 files, commit, then run official `git status` and `git checkout`.'],
      cliCommands: ['python3 my_git.py init', 'python3 my_git.py commit "My first commit"', 'git log'],
      edgeCasesToBreak: ['Committing empty files (size 0) -> must produce known empty blob hash `e69de29bb2d1d6434b8b29ae775ad8c2e48c5391`.']
    }
  }
];
