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
      highLevelArchitecture: 'A production memory allocator bridges the fundamental impedance mismatch between hardware virtual memory pages and application-level object allocations. The operating system kernel manages memory at the granularity of virtual pages (typically 4,096 bytes on x86_64 and ARM64). Every time an application requests memory directly from the kernel via syscalls like mmap or sbrk, the CPU must trigger a context switch, transition from ring 3 (userspace) to ring 0 (kernel space), traverse page table trees (PML4 -> PDPT -> PD -> PT), and allocate physical frames. An allocator reserves large multi-megabyte memory arenas from the OS and implements a low-latency userspace sub-allocator that satisfies small 16-byte, 64-byte, or 512-byte allocations in single-digit nanoseconds without touching the kernel.',
      mentalModel: 'Imagine a shipping logistics warehouse. The government postal service (the OS Kernel) only delivers giant standard shipping containers (4KB Virtual Pages). If your application needs to mail a single 12-gram letter or a 40-gram watch, calling the postal service to drop off a whole shipping container would bankrupt your program in fuel and warehouse space. Your memory allocator is the warehouse parcel manager: it accepts giant containers from the OS, slices them up into small parcel boxes with barcoded labels (block headers), hands the parcel to the customer, and re-glues adjacent empty boxes back together (coalescing) when returned.',
      deepDiveConcepts: [
        {
          title: 'Virtual Memory, Page Tables, and Demand Paging',
          tag: 'OS Kernel Architecture',
          coreConcept: 'The operating system does not allocate physical RAM when memory is requested; it creates virtual address mappings that only materialize physical frames on first touch.',
          inDepthExplanation: `When a process boots on Linux, the kernel constructs a 64-bit virtual address space. Addresses handed out by malloc are purely virtual numbers; they do not correspond to physical RAM pins on the motherboard until the process actually writes to that memory address.

When your allocator invokes sbrk(aligned_size), the Linux kernel updates the mm_struct->brk pointer in the process descriptor. No physical DRAM is mapped yet! This is known as Demand Paging. Only when your application writes its first byte into that memory does the CPU Memory Management Unit (MMU) detect an unmapped page entry in the Translation Lookaside Buffer (TLB). The CPU generates hardware interrupt #14 (Page Fault Exception). The kernel catches this interrupt, locates an empty 4KB physical page frame in DRAM, updates the Page Table entry (setting the Present bit to 1), and restarts the faulting CPU instruction seamlessly.

Understanding this principle is critical for systems programmers: allocating 1 GB of heap with an allocator costs virtually zero physical RAM until you actually write bytes into the allocated payload blocks.`,
          mathOrAlgorithm: `Virtual Address Breakdown (x86_64 4-Level Paging):
Bits 63-48: Sign extension (canonical address check)
Bits 47-39: PML4 Index (Page Map Level 4: 512 entries x 8B = 4KB)
Bits 38-30: PDPT Index (Page Directory Pointer Table)
Bits 29-21: PD Index (Page Directory)
Bits 20-12: PT Index (Page Table)
Bits 11-0:  Physical Page Offset (0 to 4095 bytes)`,
          asciiDiagram: `
+---------------------------------------------------------------------------------+
|                       VIRTUAL MEMORY ADDRESS MAPPING                            |
|  [ Virtual Pointer: 0x7fff00001000 ]                                            |
|                |                                                                |
|                v                                                                |
|  +--------------------+       Page Fault #14                                    |
|  | MMU / TLB Cache    | ------------------------+                               |
|  +--------------------+                         v                               |
|          | (Hit: Instant)             +-------------------+                     |
|          v                            | OS Kernel Trap    |                     |
|  [ Physical RAM Frame ] <------------ | Allocates 4KB RAM |                     |
|                                       +-------------------+                     |
+---------------------------------------------------------------------------------+`,
          codeSnippet: `// Inspecting real physical memory usage (RSS) vs virtual memory (VSZ)
#include <sys/resource.h>
#include <stdio.h>

void print_memory_footprint() {
    struct rusage usage;
    getrusage(RUSAGE_SELF, &usage);
    printf("Physical Memory in use (RSS): %ld KB\\n", usage.ru_maxrss);
}`
        },
        {
          title: 'Hardware Bus Alignment & Multi-Cycle Penalties',
          tag: 'Computer Architecture & CPU Buses',
          coreConcept: 'Modern 64-bit CPU memory controllers transfer data over 64-bit (8-byte) or 128-bit memory buses. Misaligned pointers cause bus lock penalties or hardware crashes.',
          inDepthExplanation: `The CPU memory bus does not read byte-by-byte; it fetches 64-bit quadwords from memory addresses that are clean multiples of 8 (e.g. 0x1000, 0x1008, 0x1010). 

If a 64-bit integer is stored at address 0x1003 (unaligned), the CPU cannot read that value in a single memory clock cycle. On x86_64, the memory controller must perform two distinct 64-bit memory reads (from 0x1000 and 0x1008), execute bit-shift and OR operations in microcode to reconstruct the 64-bit integer, costing a 2x-3x latency penalty. On strict RISC architectures like ARMv7 or SPARC, accessing an unaligned address triggers an instant hardware exception (SIGBUS / Alignment Fault).

Therefore, any allocator you write must strictly align every returned payload pointer to an 8-byte boundary on 32-bit systems, or 16-byte boundary on 64-bit systems (to support SIMD/AVX registers).`,
          mathOrAlgorithm: `Bitwise Alignment Formula:
aligned_size = (requested_size + 7) & ~((size_t)7);

Worked Example for requested_size = 13:
1. Add 7:            13 + 7 = 20  (Binary: 0001 0100)
2. Bitwise NOT 7:    ~7          (Binary: 1111 1000)
3. Bitwise AND:      20 & ~7     (Binary: 0001 0000 = 16 bytes!)
Result: 13 bytes rounded up to nearest 8-byte multiple (16).`,
          asciiDiagram: `
ALIGNED (Address 0x1000 - Multiple of 8):
Bus Read 1 [0x1000 - 0x1007]: [ B0 | B1 | B2 | B3 | B4 | B5 | B6 | B7 ] -> 1 Cycle!

MISALIGNED (Address 0x1003 - Crosses boundary):
Bus Read 1 [0x1000 - 0x1007]: [ -- | -- | -- | B0 | B1 | B2 | B3 | B4 ]
Bus Read 2 [0x1008 - 0x100F]: [ B5 | B6 | B7 | -- | -- | -- | -- | -- ]
Shift + Stitch Microcode Penalty -> 3 Cycles + Cache Line Spill!`,
          codeSnippet: `// Portable alignment macro
#define ALIGN_MASK(size, mask) (((size) + (mask)) & ~(mask))
#define ALIGN8(size)  ALIGN_MASK(size, 7)
#define ALIGN16(size) ALIGN_MASK(size, 15)

// Check if pointer is 8-byte aligned:
#define IS_ALIGNED(ptr) (((uintptr_t)(ptr) & 7) == 0)`
        },
        {
          title: 'Knuth Boundary Tag Coalescing',
          tag: 'Data Structures & Algorithms',
          coreConcept: 'By duplicating the block metadata into a footer at the trailing edge of each block, an allocator can inspect and merge both left and right neighbors in O(1) time.',
          inDepthExplanation: `When a block of memory is freed via free(ptr), the allocator must merge it with neighboring free blocks to prevent external fragmentation (a situation where total free memory is large, but broken into tiny unusable slivers).

Merging with the right neighbor is trivial: compute (char*)block + block->size to inspect the right header. But how do you merge with the left neighbor without traversing the entire linked list from the head in O(N) time?

Donald Knuth solved this in 1968 with Boundary Tags. Every block writes a 16-byte header at the beginning and an identical 16-byte footer at the very end. When freeing block P, you look backward exactly 16 bytes: (block_footer_t*)P - 1. This footer contains the left neighbor's size! You jump backward by that exact size in O(1) time and inspect its is_free flag. If free, you combine both blocks instantly into a single continuous block.`,
          mathOrAlgorithm: `Boundary Tag Coalescing State Machine:
Case 1: Left allocated, Right allocated -> No merge. Insert P into free list.
Case 2: Left allocated, Right free      -> Merge P with Right. Size = P->size + Right->size.
Case 3: Left free,      Right allocated -> Merge Left with P. Size = Left->size + P->size.
Case 4: Left free,      Right free      -> Merge Left + P + Right into one giant block!`,
          asciiDiagram: `
+-----------------------------------------------------------------------------------+
|                           KNUTH BOUNDARY TAG LAYOUT                               |
|  [Left Footer] | [Current Header] | [Current Payload] | [Current Footer] | [Right]|
|  size: 32B     | size: 64B        | User data bytes   | size: 64B        | Header |
|  is_free: 1    | is_free: 0       | ...               | is_free: 0       | ...    |
+-----------------------------------------------------------------------------------+
       ^                 ^                                      ^
       |-- 16 bytes <----| (my_free jumps backward to footer)   |
`
        },
        {
          title: 'Explicit Free Lists with In-Place Pointer Overlays',
          tag: 'Zero-Overhead Memory Reuse',
          coreConcept: 'Freed blocks do not contain active application data. We can reuse their empty payload bytes to store doubly-linked list pointers without wasting a single byte of RAM.',
          inDepthExplanation: `In a naive allocator (an implicit free list), finding a free block requires scanning every single allocated and free block from the start of the heap in O(N) time. Under heavy allocation workloads, malloc grinds to a halt.

An explicit free list connects only the free blocks in a doubly-linked list. But allocating extra memory to hold next and prev pointers would defeat the purpose of an allocator!

The key insight: when a block is free, its payload area is unused by the application. We can cast the first 16 bytes of the empty payload to struct free_node { struct free_node* next; struct free_node* prev; }. When the block is later allocated, the application overwrites those pointers with its own data. This achieves O(1) insertion, O(1) unlinking, and O(free_blocks) traversal with 0% extra memory overhead.`,
          asciiDiagram: `
WHEN FREED (In-Place Pointer Overlay):
+-------------------------------------------------------------------+
| Header: 16B | next ptr (8B) | prev ptr (8B) | Unused Payload...   |
+-------------------------------------------------------------------+
      ^              |               |
      |              v               v
  Metadata     Points to next    Points to prev
  (size, flag) free block in RAM  free block in RAM

WHEN ALLOCATED (Overwritten by Application):
+-------------------------------------------------------------------+
| Header: 16B | User Application Data (Ints, Strings, Structs...)   |
+-------------------------------------------------------------------+`
        }
      ],
      executionRoadmap: [
        {
          phaseNumber: 1,
          phaseTitle: 'The Bump Arena & 8-Byte Alignment Verification',
          summary: 'Query the OS kernel for the baseline program break using sbrk(0), implement bitmask alignment math, and allocate memory by advancing the break pointer.',
          architectureDeepDive: 'In this foundational phase, we establish the process memory baseline. The operating system maintains a process data segment break pointer. Calling sbrk(0) returns the current boundary without moving it. We then verify our alignment bitmask (x + 7) & ~7 to ensure that no matter what odd byte count the user requests (e.g. 1, 3, 11 bytes), every allocation begins on an address divisible by 8.',
          visualWorkflowAscii: `
Initial State:
Heap Base -------------> [Program Break @ 0x1000] (Kernel Boundary)

Call sbrk(ALIGN8(13)) -> ALIGN8(13) = 16 bytes:
Heap Base -------------> [ Allocated 16B: 0x1000..0x100F ] 
                         [ New Program Break @ 0x1010 ] -> Moves Up!`,
          concreteExecutionSteps: [
            'Initialize baseline project: Create my_allocator.c and test_allocator.c.',
            'Invoke sbrk(0) to record the initial heap break into a global void* heap_start.',
            'Implement size_t align8(size_t n) using the bitwise formula ((n + 7) & ~7).',
            'Implement naive_bump_malloc(size_t size): advance sbrk by align8(size) and return previous break pointer.',
            'Write assertions in main(): allocate 1 byte, 7 bytes, and 17 bytes, asserting ((uintptr_t)ptr % 8 == 0) on every pointer.'
          ],
          verificationCommand: 'gcc -Wall -Wextra -g my_allocator.c test_allocator.c -o phase1_bump && ./phase1_bump',
          expectedOutput: `[PHASE 1] Initial Program Break: 0x55c3a4000
[ALLOC] Requested 1 byte  -> Aligned 8 bytes  -> Address: 0x55c3a4000 (Aligned 8B: OK)
[ALLOC] Requested 7 bytes -> Aligned 8 bytes  -> Address: 0x55c3a4008 (Aligned 8B: OK)
[ALLOC] Requested 17 byte -> Aligned 24 bytes -> Address: 0x55c3a4010 (Aligned 8B: OK)
[PASS] Phase 1 Bump Allocator: All memory addresses strictly 8-byte aligned.`,
          edgeCasesAndPitfalls: [
            'sbrk returns (void*)-1 on failure, NOT NULL! Always check if (res == (void*)-1).',
            'Unsigned integer overflow: requesting (size_t)-1 could wrap around to 0 without checks.'
          ]
        },
        {
          phaseNumber: 2,
          phaseTitle: 'Boundary Headers & Pointer Offsetting',
          summary: 'Prepend a 16-byte metadata header before every payload and implement naive_free() by stepping backward from the user payload pointer.',
          architectureDeepDive: 'Applications pass a single pointer to free(void* ptr). The allocator receives zero arguments indicating the size of the block. Therefore, the allocator must hide metadata directly before the payload pointer in memory. When malloc returns, it returns header + 1. When free executes, it casts (block_header_t*)ptr - 1 to recover the header.',
          visualWorkflowAscii: `
Pointer Offsetting Mechanics:
Memory Address:   0x1000               0x1010
                 +--------------------+-----------------------------+
                 | Header (16 Bytes)  | Usable Payload (User Space) |
                 | size=32, is_free=0 | 0x42, 0x99, 0x00...         |
                 +--------------------+-----------------------------+
                 ^                    ^
                 |                    |
        Header Address       Payload Address (Returned to User)
       (void*)(payload - 1)  (void*)(header + 1)`,
          concreteExecutionSteps: [
            'Define struct block_header with size_t size, uint32_t is_free, and uint32_t padding.',
            'Assert that sizeof(struct block_header) is exactly 16 bytes.',
            'Update my_malloc to request ALIGN8(sizeof(header) + requested_size).',
            'Write the header fields at the start of the sbrk chunk: header->size = total_size; header->is_free = 0.',
            'Return (void*)(header + 1) to user space.',
            'In my_free(void* ptr): recover header via (struct block_header*)ptr - 1 and set header->is_free = 1.'
          ],
          verificationCommand: 'gcc -Wall -Wextra -g my_allocator.c test_allocator.c -o phase2_header && ./phase2_header',
          expectedOutput: `[PHASE 2] Block Header size: 16 bytes (Aligned 8B: OK)
[ALLOC] 48 bytes -> Allocated block at 0x55c3a4000, Payload at 0x55c3a4010
[FREE]  Freeing payload at 0x55c3a4010 -> Header recovered at 0x55c3a4000 (size: 64, is_free: 1)
[PASS] Phase 2 Header Offsetting verified with zero pointer corruptions.`,
          edgeCasesAndPitfalls: [
            'Forgetting that pointer arithmetic depends on type! (char*)ptr - 16 vs (block_header_t*)ptr - 1.',
            'Passing NULL to free() must be a no-op; always check if (!ptr) return immediately.'
          ]
        },
        {
          phaseNumber: 3,
          phaseTitle: 'Explicit Free List, Block Splitting & Memory Reuse',
          summary: 'Build an explicit doubly-linked list of freed blocks and implement block splitting to reuse memory instead of continuously growing the heap.',
          architectureDeepDive: 'Without memory reuse, even simple programs run out of memory. When a block is freed, we link it into a global explicit free list. During my_malloc, we traverse this list using First-Fit. If a free block is larger than requested plus header overhead, we split the block: the first half is returned to the user, and the remainder remains in the free list.',
          visualWorkflowAscii: `
Block Splitting:
Available Free Block (Total Size = 128 Bytes):
+-------------------------------------------------------------------+
| Header (16B) |               Free Payload (112B)                  |
+-------------------------------------------------------------------+
          |
          | User requests 32B payload (Total needed = 48B)
          v
Carved Allocation Block (48B):         Remaining Free Block (80B):
+-----------------+------------------+ +-----------------+------------------+
| Hdr (16B) sz=48 | User Data (32B)  | | Hdr (16B) sz=80 | Free Data (64B)  |
+-----------------+------------------+ +-----------------+------------------+`,
          concreteExecutionSteps: [
            'Define struct free_node with struct free_node* next and struct free_node* prev.',
            'Create global static struct block_header* free_list_head = NULL.',
            'Implement find_first_fit(size_t total_size) scanning free_list_head.',
            'Implement split_block(header, needed_size) if remainder >= sizeof(header) + 8.',
            'Implement insert_free_node() and remove_free_node() with doubly-linked pointer updates.',
            'Verify that allocating 64 bytes, freeing it, and allocating 32 bytes yields the EXACT same base address!'
          ],
          verificationCommand: 'gcc -Wall -Wextra -g my_allocator.c test_allocator.c -o phase3_reuse && ./phase3_reuse',
          expectedOutput: `[PHASE 3] Allocating Block A (64 bytes) -> Address: 0x55c3a4010
[FREE] Freeing Block A -> Added to Explicit Free List
[ALLOC] Allocating Block B (32 bytes) -> Reusing Block A address: 0x55c3a4010 (Split verified!)
[CHECK] Remainder Block (32 bytes) placed back into Free List.
[PASS] Phase 3 Memory reuse and block splitting functioning flawlessly.`,
          edgeCasesAndPitfalls: [
            'Failing to update prev pointer of the following free node when unlinking.',
            'Splitting blocks when the remainder is too small to hold a header (produces orphaned memory).'
          ]
        },
        {
          phaseNumber: 4,
          phaseTitle: 'Boundary Tag Coalescing, mmap & LD_PRELOAD Interposition',
          summary: 'Implement O(1) bidirectional coalescing with Knuth boundary footers, add mmap switching for allocations >128KB, and intercept standard Linux binaries like /bin/ls.',
          architectureDeepDive: 'In this final phase, we eliminate external fragmentation by merging adjacent free blocks in O(1) time using trailing boundary footers. We also direct large allocations (>128KB) directly to the OS kernel via mmap(MAP_ANONYMOUS), which returns physical memory immediately to the OS upon munmap. Finally, we compile as a shared library (.so) and interpose our malloc/free symbols into standard Linux CLI utilities.',
          visualWorkflowAscii: `
Coalescing 3 Adjacent Free Blocks in O(1):
[ Left Free Block (64B) ] <-> [ Current Block (32B) ] <-> [ Right Free Block (64B) ]
                                      |
                                      v Coalesce All Three
[ Single Unified Free Block (160 Bytes) ] -> Instant O(1) merge!`,
          concreteExecutionSteps: [
            'Write matching footer struct at the end of each block: (char*)header + header->size - FOOTER_SIZE.',
            'In my_free, inspect left footer at (footer_t*)header - 1 and right header at (char*)header + header->size.',
            'Execute 4-way coalescing state machine to merge contiguous free chunks.',
            'If allocation >= 128KB, route to mmap(MAP_PRIVATE | MAP_ANONYMOUS).',
            'Compile as shared library: gcc -shared -fPIC -O2 -o libmymalloc.so my_allocator.c -ldl.',
            'Run: LD_PRELOAD=./libmymalloc.so /bin/ls -la and observe successful execution.'
          ],
          verificationCommand: 'gcc -shared -fPIC -O2 -o libmymalloc.so my_allocator.c && LD_PRELOAD=./libmymalloc.so ls /',
          expectedOutput: `[MY_MALLOC] Intercepted malloc() for /bin/ls
[MY_MALLOC] Handled 42 heap allocations without libc glibc malloc!
bin   dev  home  lib64  mnt  proc  run   srv  tmp  var
boot  etc  lib   media  opt  root  sbin  sys  usr
[PASS] Phase 4 Production Verification: Custom allocator successfully powered Linux system utility!`,
          edgeCasesAndPitfalls: [
            'Calling printf() inside interposed malloc causes an infinite recursive crash loop because printf calls malloc internally! Always use raw write(2, ...) for logging.',
            'Thread-safety: in production, wrap free-list traversals with pthread_mutex_t.'
          ]
        }
      ],
      dataStructures: [
        {
          name: 'Block Header / Footer (Boundary Tag)',
          description: 'A 16-byte metadata structure directly prepending the usable payload and mirrored at the tail. Stores size, allocation flag, and previous block size for backward traversing.',
          asciiDiagram: `
+-------------------------------------------------------------+
| Header: size (8 bytes) | is_free (4 bytes) | pad (4 bytes)  |
+-------------------------------------------------------------+
| User Payload (returned by my_malloc)                        |
| ... (aligned to 8 bytes) ...                                |
+-------------------------------------------------------------+
| Footer: size (8 bytes) | is_free (4 bytes) | pad (4 bytes)  |
+-------------------------------------------------------------+`
        },
        {
          name: 'In-Place Explicit Free Node',
          description: 'Overlaid directly inside the unused user payload bytes of freed blocks. Provides doubly-linked list connectivity with zero bytes of metadata overhead.',
          asciiDiagram: `
+-------------------------------------------------------------+
| Header (16B)                                                |
+-------------------------------------------------------------+
| next: struct free_node* (8 bytes pointer)                   |
| prev: struct free_node* (8 bytes pointer)                   |
| ... unused payload remainder ...                            |
+-------------------------------------------------------------+
| Footer (16B)                                                |
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
          syscall: 'brk',
          signature: 'int brk(void* addr);',
          purpose: 'Sets the absolute break address of the process heap.'
        },
        {
          syscall: 'mmap',
          signature: 'void* mmap(void* addr, size_t length, int prot, int flags, int fd, off_t offset);',
          purpose: 'Creates a new virtual memory mapping in the process address space. Used with MAP_ANONYMOUS for large blocks.'
        },
        {
          syscall: 'munmap',
          signature: 'int munmap(void* addr, size_t length);',
          purpose: 'Releases virtual memory pages back to the operating system kernel.'
        }
      ],
      commonPitfalls: [
        'Unaligned Pointers: Accessing 64-bit integers on non-8-byte aligned addresses causes bus errors or performance penalties on ARM/x86.',
        'Off-by-One Pointer Arithmetic: Remember `(char*)ptr + 1` moves 1 byte, but `(int*)ptr + 1` moves 4 bytes!',
        'Recursive libc Crashes: Invoking printf() inside malloc() will crash via infinite recursion because printf calls malloc internally.',
        'Orphaned Remainder Fragments: Splitting a block without verifying the remainder can hold a full header and footer produces memory that can never be freed.'
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
      highLevelArchitecture: 'Modern high-performance network servers solve the classic C10K problem (handling 10,000+ concurrent connections per machine) using asynchronous I/O multiplexing. Under the legacy multi-threaded model, each connection spawned a dedicated POSIX thread with an 8MB default stack. At 10,000 clients, this consumed 80GB of RAM purely for idle thread stacks, while the Linux kernel CPU scheduler spent over 70% of CPU cycles thrashing in context switches. In an event-driven epoll architecture, a single CPU core manages tens of thousands of sockets. The operating system kernel maintains a Red-Black tree of monitored file descriptors and a Doubly-Linked Ready List. When network packets arrive at the physical NIC, hardware interrupts trigger the kernel to append ready descriptors to the list in O(1) time, waking epoll_wait() with zero CPU polling overhead.',
      mentalModel: 'Imagine an air traffic control tower managing 1,000 planes in holding patterns. In a thread-per-client system, you would need 1,000 human controllers standing in a cramped room, each staring through binoculars at one single plane—most of whom are doing nothing for minutes at a time. In an event-driven epoll system, a single controller sits in front of a radar screen. The radar (the Linux kernel) rings a chime only when a plane keys their radio microphone (an I/O event). The controller handles that transmission in 2 milliseconds, then immediately handles the next ready aircraft.',
      deepDiveConcepts: [
        {
          title: 'The C10K Problem: Context Switching & Memory Limits',
          tag: 'Operating System Scaling',
          coreConcept: 'Thread-per-connection architectures collapse under concurrency due to thread stack memory footprint and CPU L1/L2 cache invalidation during context switches.',
          inDepthExplanation: `In early web servers (such as Apache with mpm_prefork or thread pools), each incoming TCP connection was delegated to a dedicated thread:
1. Memory Wall: On x86_64 Linux, each pthread has a default stack of 8MB (or 2MB configured). 10,000 threads require 20GB to 80GB of RAM just for call stacks—even if 99% of those clients are completely idle (e.g. chat clients waiting for messages).
2. Context Switch Overhead: The Linux Completely Fair Scheduler (CFS) must periodically switch between thousands of threads. A context switch requires saving CPU registers (rax, rbx, rip, rsp), flushing the CPU pipeline, and switching MMU Page Table Roots (CR3 register). Crucially, this evicts hot data from the CPU L1 and L2 caches, causing dramatic memory bus stalls.

Event-driven non-blocking I/O replaces thousands of threads with a single event loop thread running in userspace, achieving orders-of-magnitude higher throughput with negligible memory consumption.`,
          asciiDiagram: `
THREAD-PER-CLIENT (COLLAPSES AT SCALE):
[Client 1] ---> Thread 1 (8MB Stack) --+
[Client 2] ---> Thread 2 (8MB Stack) ----> [CPU Scheduler: Constant Context Switches]
[Client 3] ---> Thread 3 (8MB Stack) --+   [Massive Cache Thrashing & RAM Exhaustion]

EVENT-DRIVEN EPOLL (SCALES TO MILLIONS):
[Client 1] --+
[Client 2] ----> [Kernel epoll Ready List] ---> Single Thread (No Context Switches)
[Client 3] --+                                  [Ultra-hot L1/L2 Cache, Low Latency!]`
        },
        {
          title: 'Linux Epoll Kernel Architecture: RB-Tree & Ready List',
          tag: 'Linux Kernel VFS',
          coreConcept: 'Epoll achieves O(1) event notification by separating socket registration (stored in a kernel Red-Black tree) from readiness notification (stored in a doubly-linked list).',
          inDepthExplanation: `Earlier Unix syscalls like select() and poll() suffered from O(N) algorithmic complexity. Every time an application called select(maxfd, ...), it passed a list of 10,000 file descriptors into the kernel. The kernel was forced to iterate linearly over every single descriptor, check its socket receive buffer, and copy the entire bitmask back to userspace.

Linux epoll solves this with two internal kernel data structures in struct eventpoll:
1. The Interest List (Red-Black Tree): When you invoke epoll_ctl(EPOLL_CTL_ADD, fd), the kernel inserts the file descriptor into an RB-Tree keyed by fd. Inserting, modifying, or removing descriptors takes O(log N) time.
2. The Ready List (Doubly-Linked List): When a TCP packet arrives at the network card, the NIC driver raises an interrupt. The kernel network stack processes the TCP segment, places bytes into the socket's sk_receive_queue, and executes the callback ep_poll_callback(). This callback immediately appends the socket's epitem struct to the Ready List.

When epoll_wait() is called, the kernel does NOT scan all descriptors! It simply checks whether the Ready List is non-empty. If non-empty, it copies only the active descriptors directly to userspace memory and returns in O(active_events) time.`,
          mathOrAlgorithm: `Algorithmic Comparison:
select() / poll():    O(N) where N = total registered sockets (e.g. 10,000 checks)
epoll_wait():         O(K) where K = number of ready sockets (e.g. 5 ready sockets)
Performance delta at 10,000 idle connections: epoll is ~2,000x faster!`,
          asciiDiagram: `
+-----------------------------------------------------------------------------------+
|                        LINUX KERNEL EPOLL INTERNALS                               |
|                                                                                   |
|  Interest List (Red-Black Tree):           Ready List (Doubly Linked List):       |
|            [fd: 12]                                [fd: 8] <-> [fd: 24]           |
|           /        \\                                      |                       |
|       [fd: 8]     [fd: 24]                                v                       |
|                                                  Copied to Userspace via          |
|                                                  epoll_wait(events, 64) in O(1)!  |
+-----------------------------------------------------------------------------------+`
        },
        {
          title: 'Edge-Triggered (EPOLLET) vs Level-Triggered (LT)',
          tag: 'Concurrency & Event Loops',
          coreConcept: 'Level-triggered mode alerts you continuously while a socket has data; Edge-triggered mode alerts you ONLY on state transitions, requiring an explicit non-blocking drain loop.',
          inDepthExplanation: `Understanding the difference between Level-Triggered (default) and Edge-Triggered (EPOLLET) mode is the hallmark of senior systems engineering:

1. Level-Triggered (LT): As long as there is unread data in the socket's kernel buffer, epoll_wait() will wake up and return that descriptor every single time. While simpler to write, it can trigger spurious wakeups and thundering herds across worker threads.
2. Edge-Triggered (ET): epoll_wait() returns the descriptor ONLY when the state changes (e.g. when new bytes arrive on an empty buffer). It will NOT notify you again for remaining bytes!

The Golden Rule of Edge-Triggered Epoll:
Because ET notifications fire only on transitions, your code MUST set the socket to O_NONBLOCK and loop calling recv() in a while loop until recv() returns -1 with errno == EAGAIN or errno == EWOULDBLOCK. If you exit the loop early with unread bytes still sitting in the socket buffer, your server will hang indefinitely waiting for a notification that will never arrive!`,
          codeSnippet: `// The Non-blocking Drain Loop for Edge-Triggered Epoll (EPOLLET):
while (1) {
    ssize_t bytes_read = recv(client_fd, buffer, sizeof(buffer), 0);
    if (bytes_read > 0) {
        process_incoming_bytes(client_fd, buffer, bytes_read);
    } else if (bytes_read == -1) {
        if (errno == EAGAIN || errno == EWOULDBLOCK) {
            // Buffer completely drained! Safe to return to epoll_wait.
            break;
        }
        // Genuine network error
        close_client(client_fd);
        break;
    } else if (bytes_read == 0) {
        // Client performed graceful TCP shutdown (EOF)
        close_client(client_fd);
        break;
    }
}`
        },
        {
          title: 'TCP Stream Framing & Ring Buffers',
          tag: 'Networking Protocols',
          coreConcept: 'TCP is a continuous byte stream, not a packet protocol. Applications must implement wire framing and ring buffers to handle arbitrary network segmentation.',
          inDepthExplanation: `A common beginner mistake is assuming that one send("hello") on the client results in one recv() returning "hello" on the server. In reality, TCP knows nothing about your application's message boundaries. 

The underlying IP layer fragments packets according to the Maximum Transmission Unit (MTU, typically 1500 bytes). If a client sends a 5,000-byte chat message, the server may receive it as 1440 bytes, then 2880 bytes, then 680 bytes across three separate epoll events. Conversely, if a client sends ten 5-byte messages in rapid succession, TCP's Nagle Algorithm may coalesce them into a single 50-byte chunk!

To solve this, we define a binary Wire Protocol:
[ 4 Bytes: uint32_t payload_len in Network Byte Order ] + [ 1 Byte: Opcode ] + [ N Bytes: Payload ]

Every client session maintains an in-memory Ring Buffer. As bytes arrive from non-blocking recv(), we append them into the ring buffer. We inspect the first 4 bytes: if the buffer holds fewer than 4 bytes, we wait. If it holds >= 4 bytes, we decode payload_len = ntohl(*(uint32_t*)buf). Only when the buffer holds 5 + payload_len bytes do we slice out the complete message and dispatch it.`,
          asciiDiagram: `
TCP PACKET FRAGMENTATION AT THE WIRE:
Client Writes:  [ Message 1: 80B ]  [ Message 2: 40B ]
                  |                    |
Kernel Fragments: v                    v
TCP Stream:     [ 50B of Msg 1 ] ----> [ 30B of Msg 1 + 20B of Msg 2 ] ----> [ 20B of Msg 2 ]
                  ^                      ^                                     ^
Event 1: Partial Frame!       Event 2: Frame 1 Finishes + Frame 2 Starts!   Event 3: Done!`
        }
      ],
      executionRoadmap: [
        {
          phaseNumber: 1,
          phaseTitle: 'Non-Blocking Server Socket & Epoll Binding',
          summary: 'Create a TCP server socket, configure SO_REUSEADDR and O_NONBLOCK with fcntl(), bind to port 9000, and register the listening socket into an epoll instance.',
          architectureDeepDive: 'We configure SO_REUSEADDR to eliminate TIME_WAIT bind failures when restarting the server during development. We apply fcntl(fd, F_SETFL, flags | O_NONBLOCK) to ensure accept() never blocks the event loop thread if a client drops its TCP SYN before the 3-way handshake completes.',
          visualWorkflowAscii: `
Socket Setup Flow:
socket(AF_INET, SOCK_STREAM) -> setsockopt(SO_REUSEADDR) -> fcntl(O_NONBLOCK)
                                                                    |
epoll_create1(0) -------------> epoll_ctl(EPOLL_CTL_ADD, listen_fd, EPOLLIN)
                                                                    |
                                                                    v
                                                     Ready for epoll_wait() loop!`,
          concreteExecutionSteps: [
            'Create server.c and define MAX_EVENTS 64, PORT 9000.',
            'Call socket(AF_INET, SOCK_STREAM, 0) and verify return value >= 0.',
            'Enable SO_REUSEADDR via setsockopt().',
            'Set non-blocking mode on listen_fd using fcntl(listen_fd, F_SETFL, O_NONBLOCK).',
            'Bind to 0.0.0.0:9000 and call listen(listen_fd, 1024) with a deep backlog queue.',
            'Create epoll instance via epfd = epoll_create1(0).',
            'Register listen_fd with epoll_ctl(epfd, EPOLL_CTL_ADD, listen_fd, &ev) with EPOLLIN.'
          ],
          verificationCommand: 'gcc -Wall -O2 server.c -o chat_server && ./chat_server & sleep 1 && nc -zv 127.0.0.1 9000 && killall chat_server',
          expectedOutput: `[PHASE 1] Epoll instance created (epfd: 3)
[PHASE 1] Non-blocking listening socket bound to 0.0.0.0:9000 (fd: 4)
[PHASE 1] Registered listen_fd into epoll interest list.
Connection to 127.0.0.1 9000 port [tcp/*] succeeded!
[PASS] Server successfully bound and accepting TCP connections without blocking.`,
          edgeCasesAndPitfalls: [
            'Forgetting SO_REUSEADDR causes "Address already in use" errors during rapid restart.',
            'Not checking fcntl return values can leave sockets in blocking mode silently.'
          ]
        },
        {
          phaseNumber: 2,
          phaseTitle: 'The Epoll Multiplexing Event Loop & Non-Blocking Drain',
          summary: 'Implement the central epoll_wait() dispatcher loop, accept new client sockets in a non-blocking loop, and drain edge-triggered client events.',
          architectureDeepDive: 'When epoll_wait returns, we distinguish between two types of events: events on listen_fd (meaning new incoming connections) and events on client sockets (incoming data or disconnection). For listen_fd, we must loop accept() until it returns EAGAIN to handle connection bursts.',
          visualWorkflowAscii: `
Event Loop Dispatcher:
                      +-------------------+
                      | epoll_wait(epfd)  |
                      +-------------------+
                                |
             +------------------+------------------+
             | (events[i].data.fd == listen_fd)    | (events[i].data.fd == client_fd)
             v                                     v
    while(1) { accept4() }              while(1) { recv() until EAGAIN }
    Register new client fd into epoll   Process framed protocol bytes`,
          concreteExecutionSteps: [
            'Construct the infinite event loop: while(running) { int n = epoll_wait(epfd, events, MAX_EVENTS, -1); }.',
            'Iterate through n triggered events.',
            'If event fd is listen_fd: loop accept4(..., SOCK_NONBLOCK) until errno == EAGAIN.',
            'Register each new client fd into epoll with EPOLLIN | EPOLLET.',
            'If event fd is a client: invoke drain_socket() looping recv() until EAGAIN.',
            'Handle disconnection when recv() returns 0 (EOF): close(client_fd) and deregister from epoll.'
          ],
          verificationCommand: 'gcc -Wall -O2 server.c -o chat_server && ./chat_server & (echo "Hello from client 1" | nc 127.0.0.1 9000) & (echo "Hello from client 2" | nc 127.0.0.1 9000) && killall chat_server',
          expectedOutput: `[EVENT] New client connected on fd: 5 (Accepted in non-blocking loop)
[EVENT] New client connected on fd: 6 (Accepted in non-blocking loop)
[RECV] Client (fd 5): Hello from client 1 (Drained until EAGAIN)
[RECV] Client (fd 6): Hello from client 2 (Drained until EAGAIN)
[DISCONNECT] Client (fd 5) disconnected cleanly.
[DISCONNECT] Client (fd 6) disconnected cleanly.
[PASS] Phase 2 Non-blocking event loop handled multiple concurrent clients on 1 thread.`,
          edgeCasesAndPitfalls: [
            'Only calling accept() once per epoll notification during a connection burst: leaves other pending clients stalled in the SYN queue.',
            'Not handling ECONNABORTED when a client drops connection before accept() completes.'
          ]
        },
        {
          phaseNumber: 3,
          phaseTitle: 'Ring Buffers & Length-Prefixed Wire Protocol',
          summary: 'Equip each client with a 64KB circular ring buffer and parse length-prefixed protocol frames to handle partial reads and packet fragmentation.',
          architectureDeepDive: 'Network fragmentation splits messages across arbitrary byte boundaries. By framing every message with a 4-byte payload length header in network byte order (Big-Endian), we guarantee that the application only executes business logic on complete, verified frames.',
          visualWorkflowAscii: `
Framed Message Wire Layout:
[ Offset 0..3: uint32_t Length (BE) ] [ Offset 4: Opcode (1B) ] [ Offset 5..N: Payload ]
Example: "hello" (5 bytes)
Hex: [ 00 00 00 05 ] [ 03 ] [ 68 65 6c 6c 6f ] (Total 10 Bytes)`,
          concreteExecutionSteps: [
            'Define client session struct: typedef struct { int fd; char rx_buf[65536]; size_t rx_len; char username[32]; char room[32]; } client_t;.',
            'Maintain a global client table: client_t* clients[MAX_FDS]; indexed by fd for O(1) lookups.',
            'When recv() reads bytes, copy into client->rx_buf + client->rx_len and advance rx_len.',
            'Check if rx_len >= 5 bytes: read uint32_t len = ntohl(*(uint32_t*)client->rx_buf).',
            'If rx_len >= 5 + len, slice out frame, dispatch handle_frame(), and memmove() remaining bytes.',
            'Sanity check len: if len > 64000, disconnect client immediately (DDoS mitigation).'
          ],
          verificationCommand: 'gcc -Wall -O2 server.c -o chat_server && python3 -c "import socket, struct, time; s = socket.socket(); s.connect((\'127.0.0.1\', 9000)); s.send(struct.pack(\'!IB\', 11, 3) + b\'chunk1-\'); time.sleep(0.1); s.send(b\'chunk2\'); s.close()" && killall chat_server',
          expectedOutput: `[RING_BUFFER] Client 5 received partial 11 bytes across 2 fragmented TCP packets.
[PARSER] Complete framed message assembled: Opcode 0x03, Length 11, Payload: 'chunk1-chunk2'
[PASS] Phase 3 Wire framing and TCP fragmentation resistance verified.`,
          edgeCasesAndPitfalls: [
            'Failing to convert endianness with ntohl/htonl: x86_64 is Little-Endian, while network protocols are Big-Endian.',
            'Missing memmove() when shifting leftover bytes in the buffer leads to memory corruption.'
          ]
        },
        {
          phaseNumber: 4,
          phaseTitle: 'Room-Based Broadcast Engine & Outbound Write Queues',
          summary: 'Implement multi-room chat routing, message broadcast fanout, and non-blocking outbound write queues with EPOLLOUT interest toggling.',
          architectureDeepDive: 'Broadcasting a message to 1,000 peers must never block the event loop. If one slow client on a 3G mobile network has a full TCP receive buffer, calling write(slow_client_fd) directly will block all other 999 clients! We solve this by queuing outbound messages in each peer’s tx_buf and enabling EPOLLOUT. When the kernel signals readiness, we flush bytes and remove EPOLLOUT.',
          visualWorkflowAscii: `
Broadcast Fanout with Write Queues:
User A writes in #general: "Hi all!"
                    |
                    v Room Router
      +-------------+-------------+
      |                           |
[Client B (Fast)]           [Client C (Slow Buffer)]
Write succeeds immediately!  Append to tx_buf + Register EPOLLOUT
                             Flush when socket buffer drains!`,
          concreteExecutionSteps: [
            'Add tx_buf and tx_len to client_t for buffered outbound writes.',
            'Implement broadcast_to_room(const char* room, const void* frame, size_t len, int sender_fd).',
            'Iterate clients in the room: attempt non-blocking write(). If EAGAIN, append to tx_buf and epoll_ctl(EPOLL_CTL_MOD, peer_fd, EPOLLIN | EPOLLOUT).',
            'When epoll_wait triggers EPOLLOUT: write pending tx_buf bytes and clear EPOLLOUT flag once empty.',
            'Stress test with 100 concurrent clients broadcasting messages.'
          ],
          verificationCommand: 'gcc -Wall -O2 server.c -o chat_server && python3 -c "import socket, time; conns = [socket.socket() for _ in range(50)]; [c.connect((\'127.0.0.1\', 9000)) for c in conns]; print(\'50 concurrent clients connected!\'); [c.close() for c in conns]" && killall chat_server',
          expectedOutput: `[ROOM] Registered 50 concurrent clients across #general and #dev.
[BROADCAST] Dispatched 1,000 messages with zero dropped packets.
[OUTBOUND] Managed write queues with EPOLLOUT toggling: 0 blocked threads.
[PASS] Phase 4 Production Broadcast Engine verified at full concurrency!`,
          edgeCasesAndPitfalls: [
            'SIGPIPE crash: writing to a socket that has closed triggers SIGPIPE, which terminates your process by default! Always execute signal(SIGPIPE, SIG_IGN).',
            'Leaving EPOLLOUT enabled when tx_buf is empty causes epoll_wait() to return immediately in an infinite 100% CPU busy-loop.'
          ]
        }
      ],
      dataStructures: [
        {
          name: 'Framed Wire Protocol Header',
          description: 'A 5-byte packed binary header consisting of a 4-byte network byte order payload length and a 1-byte opcode command.',
          asciiDiagram: `
+-------------------------------------------------------------------+
| Field:           Payload Length (uint32_t BE) | Opcode (uint8_t)  |
| Byte Offset:     0                   3        | 4                 |
| Size:            4 Bytes (Big-Endian)         | 1 Byte            |
+-------------------------------------------------------------------+
| Payload:         User UTF-8 text or binary payload (Length Bytes) |
+-------------------------------------------------------------------+`
        },
        {
          name: 'Client Session State & Ring Buffers',
          description: 'Tracks per-socket file descriptor metadata, in-memory RX/TX ring buffers, username, and assigned chat room.',
          asciiDiagram: `
+-------------------------------------------------------------------+
| client_t                                                          |
|   int fd;                                                         |
|   char rx_buf[65536];    // Accumulates fragmented TCP stream     |
|   size_t rx_len;                                                  |
|   char tx_buf[65536];    // Outbound write queue for slow peers   |
|   size_t tx_len;                                                  |
|   char username[32];                                              |
|   char room[32];         // e.g. "#general", "#systems"           |
+-------------------------------------------------------------------+`
        }
      ],
      keySyscalls: [
        { syscall: 'epoll_create1', signature: 'int epoll_create1(int flags);', purpose: 'Creates an epoll instance descriptor in the Linux kernel.' },
        { syscall: 'epoll_ctl', signature: 'int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event);', purpose: 'Registers, modifies, or deletes socket file descriptors in the kernel Red-Black tree.' },
        { syscall: 'epoll_wait', signature: 'int epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout);', purpose: 'Blocks until I/O events occur on monitored sockets, returning ready descriptors in O(1).' },
        { syscall: 'fcntl', signature: 'int fcntl(int fd, int cmd, ... /* arg */ );', purpose: 'Sets socket file descriptor flags, specifically O_NONBLOCK.' },
        { syscall: 'accept4', signature: 'int accept4(int sockfd, struct sockaddr *addr, socklen_t *addrlen, int flags);', purpose: 'Atomically accepts a connection and sets SOCK_NONBLOCK, avoiding race conditions.' }
      ],
      commonPitfalls: [
        'Assuming 1 write() == 1 read(): TCP is an unformatted byte stream, not a packet stream. Fragmentation will break naive servers.',
        'Leaving EPOLLOUT enabled permanently: Triggers a 100% CPU spinning loop because empty socket buffers are always writable.',
        'Not draining edge-triggered sockets until EAGAIN: Causes silent data stalls where clients hang indefinitely.',
        'Neglecting SIGPIPE: Writing to a disconnected client raises SIGPIPE, terminating the entire server unless ignored via signal(SIGPIPE, SIG_IGN).'
      ],
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
      highLevelArchitecture: 'A modern Layer 7 reverse proxy and load balancer acts as an intelligent application-aware gateway between public internet clients and internal microservice clusters. At the transport layer (Layer 4), a proxy merely forwards raw TCP streams without understanding the payload. At Layer 7 (Application Layer), the load balancer terminates the client TCP connection, performs HTTP protocol parsing, inspects paths, headers, and cookies, injects tracing headers (e.g. X-Forwarded-For, X-Request-ID), and chooses the optimal upstream server using sophisticated mathematical load-balancing algorithms. It monitors backend health via active asynchronous health probes and trips circuit breakers to isolate failing instances before cascading outages can occur.',
      mentalModel: 'Think of an international airport customs hall. A Layer 4 proxy is like a physical conveyor belt: it moves closed luggage boxes blindly from plane A to truck B without ever opening them. A Layer 7 load balancer is the customs inspector: it opens every suitcase (parses HTTP headers), verifies passports (inspects hostnames and authentication tokens), stamps the luggage with customs tracking tags (X-Forwarded-For), and directs the passenger to the shortest immigration queue (Least Connections balancing).',
      deepDiveConcepts: [
        {
          title: 'Layer 4 (Transport) vs Layer 7 (Application) Proxying',
          tag: 'Network Architecture & OSI Model',
          coreConcept: 'L4 proxies route raw TCP/UDP bytes with zero application awareness; L7 proxies terminate HTTP connections, parse payloads, and make content-based routing decisions.',
          inDepthExplanation: `Understanding the architectural divide between L4 and L7 is fundamental:

1. Layer 4 (e.g. Linux IPVS, AWS NLB, HAProxy TCP mode):
The proxy operates purely on IP addresses and TCP ports. When bytes arrive from a client, the proxy forwards them directly to an upstream backend socket—often utilizing zero-copy kernel syscalls like splice(). The proxy has zero visibility into whether the traffic is HTTP, gRPC, or raw binary. It cannot rewrite headers, inspect cookies, or route /api to Backend A and /static to Backend B.

2. Layer 7 (e.g. Envoy, Nginx HTTP, AWS ALB):
The proxy completely terminates the client TCP connection and parses the application protocol (HTTP/1.1 or HTTP/2). It reads the request line, parses headers into key-value pairs, and inspects the URL path. This enables content-based routing, TLS termination, path rewriting, rate limiting, and sticky session cookies. However, it incurs CPU parsing overhead and requires managing two distinct TCP state machines: Client <-> Proxy and Proxy <-> Upstream.`,
          asciiDiagram: `
LAYER 4 PROXY (Zero-Copy Byte Forwarding):
Client [TCP] =========> [ L4 Proxy (Kernel splice) ] =========> Backend [TCP]
                          (No payload inspection)

LAYER 7 REVERSE PROXY (Connection Termination & Protocol Parsing):
Client [TCP] ---> [ Terminates TCP & Parses HTTP ] ---> [ Selects Upstream ] ---> Backend [TCP]
                  - Strips Hop-by-Hop Headers          - Least Connections
                  - Injects X-Forwarded-For            - Health Checked!`
        },
        {
          title: 'HTTP/1.1 Framing: Content-Length vs Chunked Transfer Encoding',
          tag: 'Protocol Specifications',
          coreConcept: 'HTTP/1.1 request bodies are delimited either by a Content-Length header or by hex-encoded variable-sized chunks ending in a 0-byte chunk.',
          inDepthExplanation: `In HTTP/1.1, connections are persistent (Keep-Alive) by default. The proxy must know precisely where one HTTP request ends and the next begins over the exact same TCP stream.

There are two framing mechanisms:
1. Content-Length: The header specifies the exact body size in decimal bytes (e.g. Content-Length: 42). The proxy reads exactly 42 bytes from the socket after the trailing \\r\\n\\r\\n header delimiter.
2. Chunked Transfer Encoding (Transfer-Encoding: chunked): Used when the payload size is unknown in advance (e.g. streaming responses). The body consists of a series of chunks. Each chunk begins with its size written in hexadecimal, followed by \\r\\n, then the chunk data bytes, followed by \\r\\n. The stream terminates only when a zero-length chunk arrives (0\\r\\n\\r\\n).

Failure to parse chunked encoding properly creates HTTP Request Smuggling vulnerabilities, where malicious clients desynchronize the proxy and backend parsers to hijack requests!`,
          asciiDiagram: `
CHUNKED STREAM LAYOUT:
[ 1e\\r\\n ]                  -> Hex 0x1e = 30 bytes
[ 30 bytes of data... ]\\r\\n
[ 0f\\r\\n ]                  -> Hex 0x0f = 15 bytes
[ 15 bytes of data... ]\\r\\n
[ 0\\r\\n\\r\\n ]               -> 0-byte chunk: Stream Terminated!`
        },
        {
          title: 'Load Balancing Algorithms: Round-Robin, Least-Conn & P2C',
          tag: 'Distributed Systems Mathematics',
          coreConcept: 'Load balancing distributes traffic across heterogeneous servers to minimize tail latency and eliminate hot spots.',
          inDepthExplanation: `Three foundational algorithms govern load balancing:

1. Round-Robin: Distributes requests sequentially across backends using an atomic counter: idx = atomic_fetch_add(&counter, 1) % healthy_nodes. While simple, it assumes all requests require equal processing time and all backends have identical CPU power. If Backend 1 gets stuck on a heavy SQL query, Round-Robin will continue blindly dumping traffic on it!

2. Least Connections: Tracks the active_connections count for each backend (incremented on connection start, decremented on close). New requests are routed to the server with the lowest active count. This automatically diverts traffic away from slow, struggling nodes.

3. Power of Two Random Choices (P2C): In high-concurrency systems, finding the absolute minimum across 500 servers requires locking a mutex and scanning all nodes in O(N). P2C picks two backends completely at random, compares their active connections, and selects the better of the two! Mathematically proven by Michael Mitzenmacher, P2C achieves nearly the same load distribution as scanning all N nodes in O(1) time without lock contention.`,
          mathOrAlgorithm: `Power of Two Random Choices (P2C) Selection:
1. Generate two random indices: i = rand() % N; j = rand() % N;
2. If i == j, choose j = (j + 1) % N;
3. If backends[i].active_conn <= backends[j].active_conn:
       return &backends[i];
   else:
       return &backends[j];`,
          codeSnippet: `// Least Connections Upstream Selection
backend_t* select_least_connections(backend_t* pool, int count) {
    backend_t* best = NULL;
    int min_conn = 1e9;
    for (int i = 0; i < count; i++) {
        if (!pool[i].is_healthy) continue;
        int active = atomic_load(&pool[i].active_connections);
        if (active < min_conn) {
            min_conn = active;
            best = &pool[i];
        }
    }
    return best;
}`
        },
        {
          title: 'Circuit Breaking & Active Health Checking',
          tag: 'Fault Tolerance & High Availability',
          coreConcept: 'Circuit breakers prevent cascading failure by isolating dead servers before client requests trigger timeouts.',
          inDepthExplanation: `In distributed architectures, backends fail regularly (crashes, memory leaks, database connection pool exhaustion). If a proxy sends client traffic to a dead backend, the client must wait 30 seconds for a TCP timeout before receiving an error. Under 1,000 requests/sec, this creates thousands of blocked sockets and crashes the proxy itself!

The Circuit Breaker pattern introduces a 3-state finite state machine:
1. CLOSED (Normal): All traffic routes freely to the backend. Successes keep the circuit closed.
2. OPEN (Tripped): If the backend fails N consecutive health probes or returns HTTP 5xx errors above a threshold, the breaker trips to OPEN. The proxy immediately stops sending traffic to this node, failing over to remaining nodes in 0ms!
3. HALF-OPEN (Canary Recovery): After a cooldown sleep (e.g. 5 seconds), the proxy transitions to HALF-OPEN. It permits a single probe request through. If it succeeds, the circuit closes; if it fails, it returns to OPEN for another cooldown period.`,
          asciiDiagram: `
CIRCUIT BREAKER STATE MACHINE:
      +-------------------------------------------------------+
      |                                                       |
      v                                                       |
+------------+       N Consecutive Failures       +----------+ | Probe
|   CLOSED   | ---------------------------------> |   OPEN   | | Fails
|  (Healthy) |                                    | (Tripped)| |
+------------+                                    +----------+ |
      ^                                                |       |
      |             Probe Succeeded                    v       |
      +----------------------------------------- +-----------+ |
                                                 | HALF-OPEN |-+
                                                 |  (Canary) |
                                                 +-----------+`
        }
      ],
      executionRoadmap: [
        {
          phaseNumber: 1,
          phaseTitle: 'Layer 4 Transparent TCP Tunneler',
          summary: 'Build a raw bidirectional TCP proxy that listens on port 8080 and transparently pipes bytes to a single upstream backend on port 9001.',
          architectureDeepDive: 'Before tackling HTTP parsing, we construct a rock-solid Layer 4 pipe. When a client connects on port 8080, the proxy creates a secondary outbound socket, connects to 127.0.0.1:9001, and bridges the two sockets using select() or epoll_wait() with bidirectional non-blocking read/write loops.',
          visualWorkflowAscii: `
L4 Tunnel Pipe:
[ Client: curl :8080 ] <---> [ Proxy listen: 8080 ]
                                      |
                             Secondary connect()
                                      v
                             [ Upstream: :9001 ]`,
          concreteExecutionSteps: [
            'Create proxy.c and declare listening socket on port 8080.',
            'Accept client connection -> get client_fd.',
            'Open upstream socket: connect() to 127.0.0.1:9001 -> get upstream_fd.',
            'Use select() to monitor both client_fd and upstream_fd for readability.',
            'When client_fd is readable: read into buffer and write to upstream_fd.',
            'When upstream_fd is readable: read into buffer and write to client_fd.',
            'Verify end-to-end data transfer with curl through the proxy.'
          ],
          verificationCommand: 'python3 -m http.server 9001 & gcc -O2 proxy.c -o l4_proxy && ./l4_proxy & sleep 1 && curl -v http://localhost:8080/ && killall l4_proxy python3',
          expectedOutput: `[L4_PROXY] Client connected on fd 4
[L4_PROXY] Connected to upstream 127.0.0.1:9001 on fd 5
[L4_PROXY] Forwarded 142 bytes to upstream
[L4_PROXY] Forwarded 280 bytes back to client
HTTP/1.0 200 OK
[PASS] Phase 1 Layer 4 transparent TCP tunneling verified!`,
          edgeCasesAndPitfalls: [
            'Half-closed TCP connections: if client sends FIN, you must close upstream write channel via shutdown(upstream_fd, SHUT_WR).',
            'Connection refused: if backend 9001 is down, proxy must handle ECONNREFUSED and close client connection cleanly.'
          ]
        },
        {
          phaseNumber: 2,
          phaseTitle: 'Zero-Copy L7 HTTP/1.1 Parser & Header Mutation',
          summary: 'Parse the incoming HTTP request stream, extract Method, Path, and Headers, inject X-Forwarded-For, and rewrite the Host header for upstream servers.',
          architectureDeepDive: 'In Layer 7, the proxy must inspect the application protocol. We parse the request line (e.g. GET /api/users HTTP/1.1) and iterate through headers until \\r\\n\\r\\n. We strip hop-by-hop headers (like Connection: keep-alive) and append X-Forwarded-For: <client_ip> so upstreams can see the real client origin.',
          visualWorkflowAscii: `
L7 Header Modification:
Client Sends:                          Proxy Rewrites For Upstream:
GET / HTTP/1.1                         GET / HTTP/1.1
Host: loadbalancer.local     ----->    Host: backend-9001.internal
User-Agent: curl/7.68                  User-Agent: curl/7.68
                                       X-Forwarded-For: 203.0.113.19
                                       X-Proxy-By: Handcrafted-L7`,
          concreteExecutionSteps: [
            'Implement parse_http_request(const char* raw, http_request_t* req).',
            'Locate end of headers by searching for substring "\\r\\n\\r\\n".',
            'Parse method, path, and version from the first line.',
            'Extract header key-value pairs into a hash table or struct array.',
            'Inject X-Forwarded-For and X-Forwarded-Proto headers.',
            'Re-serialize the request and forward to upstream backend.'
          ],
          verificationCommand: 'gcc -Wall -O2 proxy.c -o l7_proxy && ./l7_proxy & sleep 1 && curl -H "X-Custom: TestVal" http://localhost:8080/api/test && killall l7_proxy',
          expectedOutput: `[L7_PARSER] Method: GET, Path: /api/test, Version: HTTP/1.1
[HEADER] Host: localhost:8080
[HEADER] X-Custom: TestVal
[MUTATION] Injected 'X-Forwarded-For: 127.0.0.1'
[MUTATION] Injected 'X-Forwarded-Proto: http'
[PASS] Phase 2 Layer 7 HTTP parsing and header mutation verified!`,
          edgeCasesAndPitfalls: [
            'Buffer overflow on huge headers: reject requests exceeding 8KB with HTTP 431 Request Header Fields Too Large.',
            'Splitting \\r\\n across TCP packets: ensure buffer accumulates the full header block before attempting parse.'
          ]
        },
        {
          phaseNumber: 3,
          phaseTitle: 'Multi-Backend Pool & Load Balancing Engine',
          summary: 'Configure a pool of 3 upstream backend servers and implement Round-Robin and Least-Connections balancing with atomic thread safety.',
          architectureDeepDive: 'We expand from a single backend to a dynamic backend pool struct backend_t pool[MAX_BACKENDS]. We implement atomic Round-Robin using atomic_fetch_add to guarantee lock-free selection across worker threads, and Least Connections by tracking active socket references.',
          visualWorkflowAscii: `
Load Balancing Routing:
                       [ Inbound HTTP Request ]
                                  |
                   Atomic Round-Robin / Least-Conn
                                  |
         +------------------------+------------------------+
         | (Req 1)                | (Req 2)                | (Req 3)
         v                        v                        v
[ Backend 1: 9001 ]      [ Backend 2: 9002 ]      [ Backend 3: 9003 ]`,
          concreteExecutionSteps: [
            'Define backend_t with host, port, active_connections, and is_healthy.',
            'Initialize 3 backends on ports 9001, 9002, 9003.',
            'Implement select_backend_round_robin() using atomic increment modulo healthy count.',
            'Implement select_backend_least_conn() finding min active_connections.',
            'Atomically increment backend->active_connections upon request dispatch.',
            'Atomically decrement backend->active_connections upon client response completion.'
          ],
          verificationCommand: 'python3 -m http.server 9001 & python3 -m http.server 9002 & python3 -m http.server 9003 & gcc -O2 proxy.c -o lb_proxy && ./lb_proxy & sleep 1 && for i in {1..6}; do curl -s http://localhost:8080/ > /dev/null; done && killall lb_proxy python3',
          expectedOutput: `[ROUTER] Dispatched Request 1 -> Backend 9001 (Active: 1)
[ROUTER] Dispatched Request 2 -> Backend 9002 (Active: 1)
[ROUTER] Dispatched Request 3 -> Backend 9003 (Active: 1)
[ROUTER] Dispatched Request 4 -> Backend 9001 (Active: 1)
[ROUTER] Dispatched Request 5 -> Backend 9002 (Active: 1)
[ROUTER] Dispatched Request 6 -> Backend 9003 (Active: 1)
[PASS] Phase 3 Even distribution verified across 3 upstream nodes!`,
          edgeCasesAndPitfalls: [
            'All backends dead: if healthy_count == 0, return HTTP 503 Service Unavailable immediately rather than dividing by zero in modulo!',
            'Underflow in active_connections: ensure decrement only runs if increment succeeded.'
          ]
        },
        {
          phaseNumber: 4,
          phaseTitle: 'Active Health Probing, Circuit Breaker & High-Load Benchmarking',
          summary: 'Spawn a background health-check thread probing /healthz every 2s, trip circuit breakers on consecutive failures, and benchmark with wrk.',
          architectureDeepDive: 'In this production phase, we achieve resilience. A background thread opens non-blocking TCP connections to each backend every 2,000ms and sends GET /healthz. If an upstream crashes, its status flips to unhealthy within 2 seconds. The routing engine seamlessly excludes it without dropping a single user request.',
          visualWorkflowAscii: `
Health Check & Automatic Failover:
Probe Thread (Every 2s) ----> GET /healthz on 9001: 200 OK (Healthy)
                        ----> GET /healthz on 9002: Connection Refused!
                                                    |
                                                    v Trip Circuit Breaker
                                      [ Mark Backend 9002 UNHEALTHY ]
                                                    |
Router automatically diverts 100% of traffic to 9001 & 9003! Zero user errors!`,
          concreteExecutionSteps: [
            'Create pthread_create(&health_tid, NULL, health_check_worker, NULL).',
            'In worker loop: sleep 2 seconds, iterate through all backends.',
            'Open non-blocking socket with 500ms timeout to each backend /healthz.',
            'If 3 consecutive probes fail: set backend->is_healthy = 0.',
            'If unhealthy backend succeeds 2 consecutive times: set backend->is_healthy = 1.',
            'Benchmark with wrk -t4 -c100 -d10s http://localhost:8080/ to prove 10,000+ RPS.'
          ],
          verificationCommand: 'gcc -O2 -pthread proxy.c -o lb_proxy && ./lb_proxy & sleep 1 && wrk -t2 -c50 -d3s http://localhost:8080/ && killall lb_proxy',
          expectedOutput: `[HEALTH_CHECK] Backend 9001: OK (200 OK in 1.2ms)
[HEALTH_CHECK] Backend 9002: DOWN (Connection Refused) -> Marked Unhealthy
[HEALTH_CHECK] Backend 9003: OK (200 OK in 0.9ms)
Running 3s test @ http://localhost:8080/
  2 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.82ms    0.64ms   7.21ms   81.2%
    Req/Sec     12.4k     1.1k     14.2k    78.0%
  74210 requests in 3.00s, 11.2MB read
Requests/sec:  24,736.65
Transfer/sec:      3.73MB
[PASS] Phase 4 Circuit breaker and high-throughput benchmark verified!`,
          edgeCasesAndPitfalls: [
            'Health check probe storms: stagger health check probes across nodes rather than pinging all simultaneously.',
            'Socket leak in health checker: ensure probe sockets are closed immediately after reading response status.'
          ]
        }
      ],
      dataStructures: [
        {
          name: 'Upstream Backend Struct',
          description: 'Tracks address, weight, atomic active connections count, failure counters, and circuit breaker health state.',
          asciiDiagram: `
+-------------------------------------------------------------------+
| backend_t                                                         |
|   char host[64];                                                  |
|   int port;                                                       |
|   atomic_int active_connections;  // Tracks current inflight requests |
|   int failure_count;             // Consecutive probe failures   |
|   int is_healthy;                // 1 = Active, 0 = Tripped      |
|   uint64_t total_requests_served;                                 |
+-------------------------------------------------------------------+`
        },
        {
          name: 'Parsed HTTP/1.1 Request Descriptor',
          description: 'Zero-copy representation of parsed HTTP method, URL path, protocol version, and request headers.',
          asciiDiagram: `
+-------------------------------------------------------------------+
| http_request_t                                                    |
|   char method[16];        // "GET", "POST", "PUT"                 |
|   char path[256];         // "/api/v1/resource"                   |
|   char version[16];      // "HTTP/1.1"                           |
|   header_t headers[32];   // Key-value pairs                      |
|   int num_headers;                                                |
|   size_t content_length;                                          |
|   int is_chunked;                                                 |
+-------------------------------------------------------------------+`
        }
      ],
      keySyscalls: [
        { syscall: 'connect', signature: 'int connect(int sockfd, const struct sockaddr *addr, socklen_t addrlen);', purpose: 'Establishes TCP connections to upstream backend servers.' },
        { syscall: 'splice', signature: 'ssize_t splice(int fd_in, off64_t *off_in, int fd_out, off64_t *off_out, size_t len, unsigned int flags);', purpose: 'Moves data between sockets entirely in kernel space without userspace buffer copying.' },
        { syscall: 'setsockopt', signature: 'int setsockopt(int sockfd, int level, int optname, const void *optval, socklen_t optlen);', purpose: 'Configures SO_RCVTIMEO and SO_SNDTIMEO to prevent slow upstream hangs.' },
        { syscall: 'getaddrinfo', signature: 'int getaddrinfo(const char *node, const char *service, const struct addrinfo *hints, struct addrinfo **res);', purpose: 'Performs DNS resolution for backend hostnames.' }
      ],
      commonPitfalls: [
        'Slow upstream socket starvation: Failing to set SO_RCVTIMEO allows a stalled backend to freeze a proxy thread forever.',
        'Ephemeral port exhaustion: Opening and closing thousands of upstream sockets leaves them in TIME_WAIT, depleting ports 32768–60999.',
        'Division by zero on total outage: Attempting modulo % healthy_count when all backends are dead crashes the process.',
        'Request Smuggling from chunked desync: Failing to parse \\r\\n after chunk hex sizes creates parsing discrepancies with upstreams.'
      ],
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
      highLevelArchitecture: 'Modern web frameworks impose staggering latency and memory bloat by interleaving half a dozen abstraction layers: Browser -> Nginx -> Gunicorn -> WSGI/ASGI -> Django/Rails -> Active Record ORM -> SQL Driver -> PostgreSQL -> OS Page Cache -> Physical NVMe. In a baremetal storage engine and web server, this entire stack collapses into a single static compiled binary (Browser -> Handcrafted Binary -> Disk). By employing an append-only log structured storage model (pioneered by Bitcask and Kafka), writes achieve the physical maximum sequential throughput of the underlying storage hardware. Reads are served in O(1) time via an in-memory sparse index mapping post IDs directly to 64-bit disk byte offsets, eliminating all SQL parsing and database IPC latency.',
      mentalModel: 'Think of an ancient stone tablet chronicle. You never chisel away past entries to update a record; you simply chisel the newest update at the bottom of the tablet (Append-Only Log). In your pocket, you carry a tiny parchment slip with page numbers written down (In-Memory Index). When someone asks for entry #42, you glance at the parchment ("Page 14, Line 3"), flip directly to that exact spot on the stone tablet, and read the text instantly without scanning the whole library.',
      deepDiveConcepts: [
        {
          title: 'Durability Guarantees: write() vs fsync() vs fdatasync()',
          tag: 'Storage Systems & Kernel VFS',
          coreConcept: 'Calling write() does NOT write bytes to disk; it merely copies bytes to volatile RAM (the OS Page Cache). Real persistence requires explicit fsync() write barriers.',
          inDepthExplanation: `A dangerous misconception in database programming is assuming write(fd, buf, len) guarantees data is safely on disk.

When you call write():
1. The kernel copies bytes from userspace into kernel memory (the Page Cache).
2. The kernel marks those 4KB virtual pages as "dirty".
3. The write() syscall immediately returns success (often in less than 1 microsecond).
4. Sometime in the next 30 seconds, the kernel background flusher thread (pdflush / flusher) wakes up and schedules DMA transfers to the drive.

If the machine loses power or the operating system crashes between step 3 and step 4, the data is completely lost! Even worse, if only half the record was flushed, the database file becomes corrupt (a "torn write").

To provide genuine ACID durability:
- fsync(fd): Flushes all dirty page cache buffers to disk AND updates the file inode metadata (modification time, file size).
- fdatasync(fd): Flushes dirty data pages to disk, but avoids flushing non-essential inode metadata (e.g. atime), saving an extra mechanical or SSD metadata write cycle.`,
          asciiDiagram: `
THE WRITE PATH & VOLATILE CACHE:
Application ---> write() ---> [ OS Page Cache (RAM) ] ---> (Power Cut = DATA LOSS!)
                                      |
                                  fsync()
                                      v
                             [ Physical NVMe / SSD ] ---> Guaranteed Safe!`
        },
        {
          title: 'Append-Only Logs & Bitcask-Style In-Memory Indexing',
          tag: 'Database Internals',
          coreConcept: 'Sequential disk writes are 10x-100x faster than random writes. Append-only logs turn all writes into sequential streams and keep a RAM index for O(1) reads.',
          inDepthExplanation: `Traditional databases like SQLite and PostgreSQL use B-Tree indexes on disk. When a row is inserted, the engine must traverse B-Tree branch pages, potentially performing 3 to 4 random disk seek operations. On mechanical disks, random seeks cost 10 milliseconds; even on modern NVMe drives, random small-block writes trigger flash memory write amplification and garbage collection stalls.

The Bitcask Model (used by Riak and Kafka):
1. All creates, updates, and deletes are appended strictly to the tail of an append-only file (blog.db).
2. A delete is simply appending a record with a special tombstone flag.
3. An update is simply appending the newest version of the post.
4. In memory, the server maintains an index hash table:
   id -> { uint64_t file_offset, uint32_t record_length }
5. To read: look up id in RAM to get offset, then call pread(fd, buf, length, offset) to fetch the exact record from disk in a single I/O read!`,
          asciiDiagram: `
APPEND-ONLY LOG STRUCTURE (blog.db):
[ Offset: 0x0000 ] Post 1 (Create: "Hello World")
[ Offset: 0x0080 ] Post 2 (Create: "Systems Programming")
[ Offset: 0x0120 ] Post 1 (Update: "Hello World v2")  <-- Latest version!
[ Offset: 0x01A0 ] Post 3 (Create: "Zero Copy")

IN-MEMORY HASH INDEX (RAM):
Post 1 ---> Offset 0x0120 (Latest!)
Post 2 ---> Offset 0x0080
Post 3 ---> Offset 0x01A0`
        },
        {
          title: 'Binary Envelope Framing with CRC32 & Magic Bytes',
          tag: 'Data Integrity & Serialization',
          coreConcept: 'Binary record envelopes prevent file corruption using magic sync bytes, 32-bit length fields, and polynomial CRC32 integrity checksums.',
          inDepthExplanation: `If a server loses power during an append write, the tail of the log file will contain an incomplete, truncated record. Without binary framing, the next server boot will try to interpret garbage bytes, crashing the engine.

We wrap every record in a binary envelope:
1. Magic Bytes (2 Bytes): 0xBA 0xBE (serves as a recognizable sync marker).
2. Record ID (8 Bytes): uint64_t unique identifier.
3. Timestamp (8 Bytes): uint64_t epoch seconds.
4. Title Length (4 Bytes) & Body Length (4 Bytes).
5. UTF-8 Payload Data.
6. CRC32 Checksum (4 Bytes): Computed over all preceding fields in the envelope.

During cold boot recovery, the server replays the log from byte offset 0. If a record's computed CRC32 matches the envelope CRC32, the record is accepted and the in-memory index is updated. If a CRC mismatch or EOF is encountered, the engine truncates the file back to the last valid record offset, guaranteeing 100% crash consistency!`,
          codeSnippet: `// CRC32 Checksum verification on cold boot
uint32_t expected_crc = read_uint32(file);
uint32_t actual_crc = compute_crc32(record_buffer, record_len);
if (expected_crc != actual_crc) {
    fprintf(stderr, "[CORRUPTION DETECTED] Torn write at offset %zu! Truncating log.\\n", offset);
    ftruncate(fileno(db_file), offset);
    break;
}`
        },
        {
          title: 'Single-Pass Zero-Allocation Markdown Lexer',
          tag: 'Compilers & String Parsing',
          coreConcept: 'A Deterministic Finite Automaton (DFA) parses Markdown syntax in a single linear O(N) scan without allocating intermediate heap strings.',
          inDepthExplanation: `Most web applications parse Markdown using regex libraries or AST compilers that allocate thousands of tiny node objects on the heap. This causes massive memory churn and garbage collection pauses.

Our handcrafted lexer uses a state machine that reads characters directly from the source buffer and streams transformed HTML directly into the outbound client network buffer:
- State START_OF_LINE: Check for '#' characters. Count consecutive '#' to determine <h1> through <h6>.
- State IN_PARAGRAPH: Check for '**' (toggles <strong> / </strong>), '*' (toggles <em> / </em>), and inline code backticks (toggles <code> / </code>).
- State ESCAPING: Automatically sanitize dangerous characters (< becomes &lt;, > becomes &gt;, & becomes &amp;) to prevent Cross-Site Scripting (XSS) vulnerabilities.

Zero malloc() calls! The lexer executes in single-pass linear time with O(1) auxiliary memory.`,
          asciiDiagram: `
STATE MACHINE TRANSITIONS:
[ START_OF_LINE ] --- '#' ---> [ PARSE_HEADING ] ---> '\\n' ---> [ Write </hN> ]
       |
    Char != '#'
       v
[ IN_PARAGRAPH ] --- '**' ---> [ TOGGLE_BOLD ] (Emits <strong> or </strong>)
       |
     backtick (code fence)
       v
[ TOGGLE_CODE ] (Emits <code> or </code>)`
        }
      ],
      executionRoadmap: [
        {
          phaseNumber: 1,
          phaseTitle: 'Packed Binary Record Format & CRC32 Storage Engine',
          summary: 'Implement on-disk binary record serialization, append-only writing with fdatasync(), and CRC32 checksum calculation.',
          architectureDeepDive: 'In this phase, we build the core storage primitive. We define the exact byte layout of our database records, packing 64-bit timestamps and 32-bit length headers. We write an append_post() function that writes records to the end of blog.db and forces dirty pages to disk.',
          visualWorkflowAscii: `
Binary Append Flow:
Record Payload -> Compute CRC32 -> Assemble Envelope -> write(fd) -> fdatasync(fd)
                                                                           |
                                                      Byte offset returned to caller!`,
          concreteExecutionSteps: [
            'Create storage.h and storage.c defining struct post_record.',
            'Implement uint32_t crc32(const void* data, size_t length) using IEEE 802.3 polynomial.',
            'Implement db_open("blog.db") opening file with O_RDWR | O_CREAT | O_APPEND.',
            'Implement append_post(const char* title, const char* body) returning 64-bit disk offset.',
            'Write test_storage.c: append 3 sample posts and verify exact file byte size with ls -l.'
          ],
          verificationCommand: 'gcc -Wall -O2 storage.c test_storage.c -o test_storage && ./test_storage && ls -la blog.db',
          expectedOutput: `[STORAGE] Opened 'blog.db' in append-only mode.
[APPEND] Post 1: 'First Post' -> Offset: 0 (Size: 84B, CRC32: 0x9f23a1b0)
[APPEND] Post 2: 'Systems Architecture' -> Offset: 84 (Size: 102B, CRC32: 0x7c41d8e2)
[SYNC] Forced disk write barrier via fdatasync().
[PASS] Phase 1 Binary storage engine verified with zero data loss!`,
          edgeCasesAndPitfalls: [
            'Endianness bugs: store all integers in Big-Endian or Little-Endian consistently using htonl/ntohl.',
            'Buffer overflow on huge titles: enforce MAX_TITLE_LEN (256B) and MAX_BODY_LEN (64KB).'
          ]
        },
        {
          phaseNumber: 2,
          phaseTitle: 'In-Memory Hash Index & Cold Boot Recovery',
          summary: 'Construct an in-memory hash index mapping Post IDs to disk offsets, and implement full recovery replay from disk on startup.',
          architectureDeepDive: 'When the server boots, memory is empty. We open blog.db and read sequentially from byte 0 to EOF. For each valid record, we calculate the CRC32 checksum. If valid, we insert the offset into our RAM hash table. If a torn write is detected at EOF, we truncate the file cleanly.',
          visualWorkflowAscii: `
Cold Boot Replay:
blog.db Offset 0:    Read Header -> Verify CRC32 -> Insert RAM Index: ID 1 @ Offset 0
blog.db Offset 84:   Read Header -> Verify CRC32 -> Insert RAM Index: ID 2 @ Offset 84
blog.db Offset 186:  EOF reached! Storage ready for 0ms lookups!`,
          concreteExecutionSteps: [
            'Implement index_init() and index_insert(uint64_t id, off_t offset, size_t len).',
            'Implement recover_database(): loop pread() from offset 0 until end of file.',
            'Verify magic bytes 0xBABE on each record; calculate and assert CRC32.',
            'Implement get_post(uint64_t id): look up offset in RAM, pread() exact bytes from disk.',
            'Simulate crash: kill process, restart, and assert all posts are immediately queryable.'
          ],
          verificationCommand: 'gcc -Wall -O2 storage.c test_recovery.c -o test_recovery && ./test_recovery',
          expectedOutput: `[COLD_BOOT] Scanning 'blog.db' for recovery...
[REPLAY] Offset 0x0000: Verified Record ID 1 (CRC OK) -> Indexed in RAM
[REPLAY] Offset 0x0054: Verified Record ID 2 (CRC OK) -> Indexed in RAM
[REPLAY] Total 2 posts recovered successfully in 0.18ms!
[QUERY] Fetching Post ID 1 via RAM index: Title = 'First Post', Body = '...' (Loaded in 1 pread)
[PASS] Phase 2 In-memory index recovery verified across cold boots!`,
          edgeCasesAndPitfalls: [
            'Torn write at EOF: if the last record is truncated, don\'t crash; call ftruncate() to slice away the incomplete bytes.',
            'Hash collision in index table: use chaining or open addressing with quadratic probing.'
          ]
        },
        {
          phaseNumber: 3,
          phaseTitle: 'Zero-Allocation Markdown Lexer & HTML Sanitizer',
          summary: 'Build a single-pass Deterministic Finite Automaton (DFA) lexer converting Markdown headers, formatting, and code blocks into sanitized HTML.',
          architectureDeepDive: 'We eliminate external templating engines. The lexer streams characters directly from source Markdown into an outbound HTML buffer, converting # to <h1>, ** to <strong>, and replacing < > & with HTML entities to protect against XSS injection.',
          visualWorkflowAscii: `
Markdown Stream Processing:
Source: "# Hello **world**"
  |
  v DFA Lexer
Tokens: [H1_OPEN] "Hello " [STRONG_OPEN] "world" [STRONG_CLOSE] [H1_CLOSE]
  |
  v Stream Output
HTML:   "<h1>Hello <strong>world</strong></h1>\\n"`,
          concreteExecutionSteps: [
            'Create markdown.h and markdown.c.',
            'Implement markdown_to_html(const char* md, size_t md_len, char* html_out, size_t max_out).',
            'Handle header levels 1 to 6 by counting leading # characters.',
            'Handle bold (**) and italic (*) state transitions with boolean flags.',
            'Sanitize HTML characters: map \'<\' -> "&lt;", \'>\' -> "&gt;", \'&\' -> "&amp;".',
            'Test with sample markdown strings and verify output HTML correctness.'
          ],
          verificationCommand: 'gcc -Wall -O2 markdown.c test_markdown.c -o test_md && ./test_md',
          expectedOutput: `[MARKDOWN] Input: '# Systems Programming\\nThis is **fast** and *safe* <script>alert(1)</script>'
[HTML_OUT] <h1>Systems Programming</h1>
<p>This is <strong>fast</strong> and <em>safe</em> &lt;script&gt;alert(1)&lt;/script&gt;</p>
[SANITIZATION] XSS attack vector safely neutralized into HTML entities.
[PASS] Phase 3 Zero-allocation Markdown parser and HTML sanitizer verified!`,
          edgeCasesAndPitfalls: [
            'Unclosed formatting tags: if user writes "**bold text", auto-close the </strong> at end of line.',
            'Output buffer truncation: always ensure output buffer has space for entity expansions (&lt; is 4 bytes for 1 char).'
          ]
        },
        {
          phaseNumber: 4,
          phaseTitle: 'Embedded HTTP Server & Zero-Copy sendfile() Static Streaming',
          summary: 'Combine storage, markdown lexer, and a raw HTTP/1.1 socket server; serve dynamic blog posts and stream static assets with sendfile().',
          architectureDeepDive: 'In this culminating phase, we tie the entire stack together. We bind an HTTP socket on port 8080. When GET /posts/:id arrives, we fetch the post via RAM index, compile Markdown to HTML, and return an HTTP 200 response. For static CSS and images (/static/*), we invoke sendfile() to pipe bytes directly from disk cache to the network socket with zero userspace memory copies.',
          visualWorkflowAscii: `
Complete End-to-End Request Pipeline:
Browser [GET /post/1] ---> [ HTTP Router ]
                                 |
                          [ RAM Index ] -> Offset 0x0000
                                 |
                          [ pread() Disk ] -> Raw Markdown
                                 |
                          [ Markdown DFA ] -> Rendered HTML
                                 |
Browser <----------------- [ HTTP 200 OK Response ]`,
          concreteExecutionSteps: [
            'Implement http_server.c binding to 0.0.0.0:8080.',
            'Route GET / -> render index of all posts.',
            'Route GET /post/<id> -> fetch post, render Markdown HTML, return response.',
            'Route POST /new -> parse form submission, append to storage engine, redirect to post.',
            'Route GET /static/* -> open static file, call sendfile(client_fd, file_fd, NULL, size).',
            'Verify with curl and open in web browser.'
          ],
          verificationCommand: 'gcc -Wall -O2 storage.c markdown.c server.c -o baremetal_blog && ./baremetal_blog & sleep 1 && curl -s http://localhost:8080/post/1 && killall baremetal_blog',
          expectedOutput: `[SERVER] Baremetal Blog Engine listening on http://0.0.0.0:8080
[HTTP] GET /post/1 -> 200 OK (Served in 0.32ms from RAM Index + Disk pread)
[STATIC] GET /static/style.css -> 200 OK (Streamed 1,420 bytes via sendfile)
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 312

<!DOCTYPE html><html><head><title>First Post</title></head><body><h1>First Post</h1><p>Welcome to our handcrafted blog.</p></body></html>
[PASS] Phase 4 Complete baremetal web engine and storage system verified!`,
          edgeCasesAndPitfalls: [
            'Path Traversal: accessing /static/../../etc/passwd must be blocked by checking for ".." in the request path.',
            'Zero-length file handling in sendfile: verify file size > 0 before calling sendfile().'
          ]
        }
      ],
      dataStructures: [
        {
          name: 'On-Disk Post Record Layout',
          description: 'A packed binary format stored directly in the database file with sync magic bytes, timestamps, length fields, and CRC32 checksums.',
          asciiDiagram: `
+-------------------------------------------------------------------+
| Field:       Magic (2B) | ID (8B) | Timestamp (8B)                |
| Offset:      0          | 2       | 10                            |
+-------------------------------------------------------------------+
| Field:       TitleLen (4B) | Title Data (TitleLen Bytes)          |
+-------------------------------------------------------------------+
| Field:       BodyLen (4B)  | Markdown Body Data (BodyLen Bytes)   |
+-------------------------------------------------------------------+
| Field:       CRC32 Checksum (4 Bytes)                             |
+-------------------------------------------------------------------+`
        },
        {
          name: 'In-Memory Offset Index Entry',
          description: 'Compact 24-byte RAM struct enabling instant O(1) disk lookups by ID without scanning the file.',
          asciiDiagram: `
+-------------------------------------------------------------------+
| index_entry_t                                                     |
|   uint64_t post_id;                                               |
|   uint64_t file_offset;      // Byte position in blog.db          |
|   uint32_t total_length;     // Total record size for pread()     |
|   struct index_entry* next;  // Hash bucket chaining pointer      |
+-------------------------------------------------------------------+`
        }
      ],
      keySyscalls: [
        { syscall: 'pread', signature: 'ssize_t pread(int fd, void *buf, size_t count, off_t offset);', purpose: 'Thread-safe random offset file reads without mutating the shared file descriptor seek pointer.' },
        { syscall: 'pwrite', signature: 'ssize_t pwrite(int fd, const void *buf, size_t count, off_t offset);', purpose: 'Thread-safe atomic record appending at specified file offsets.' },
        { syscall: 'fdatasync', signature: 'int fdatasync(int fd);', purpose: 'Flushes dirty page cache buffers to non-volatile physical storage without unnecessary inode metadata updates.' },
        { syscall: 'sendfile', signature: 'ssize_t sendfile(int out_fd, int in_fd, off_t *offset, size_t count);', purpose: 'Transfers static file data directly from kernel cache to network socket without userspace memory copying.' },
        { syscall: 'ftruncate', signature: 'int ftruncate(int fd, off_t length);', purpose: 'Truncates storage file to remove corrupted torn writes during cold recovery.' }
      ],
      commonPitfalls: [
        'Torn writes without fsync: Assuming write() guarantees persistence leads to catastrophic data loss on power cuts.',
        'Path Traversal attacks: Failing to sanitize /static/ paths enables malicious users to download /etc/passwd or SSH keys.',
        'XSS Vulnerabilities: Not sanitizing user Markdown enables malicious HTML injection (<script> stolen cookies).',
        'Mutating shared seek pointers: Using lseek() + read() instead of pread() introduces race conditions between concurrent worker threads.'
      ],
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
      highLevelArchitecture: 'Git is not a diff-tracking tool; it is a content-addressable storage engine with a Merkle Directed Acyclic Graph (DAG) mounted on top of it. In Git, every version of every file, directory tree, and commit is stored as an immutable object referenced purely by its 160-bit SHA-1 cryptographic digest. There are only four core object primitives: Blobs (raw file content), Trees (directory listings mapping file modes and filenames to object hashes), Commits (immutable snapshot metadata pointing to a root Tree and parent Commits), and Annotated Tags. Because every commit includes the hash of its parent commit, the entire revision history forms a cryptographically secure chain where any historical modification changes all subsequent commit hashes up to HEAD.',
      mentalModel: 'Imagine a high-security cryptographic vault. When you hand a document to the vault guard, they run it through a cryptographic shredder-scanner that prints a unique 40-character wax stamp (the SHA-1 hash). The guard places the document into a safety box indexed by that stamp. If you change a single punctuation mark, the document gets a completely new stamp and a new box. Directories are just packing manifests listing which stamps belong to which filenames, and commits are signed certificates attesting that at a specific instant in time, the vault was in that exact state.',
      deepDiveConcepts: [
        {
          title: 'Content-Addressable Storage (CAS) & SHA-1 Deduplication',
          tag: 'Cryptography & Data Structures',
          coreConcept: 'Files are addressed by the cryptographic hash of their content, not their human-assigned filenames. Identical files across any directory share the exact same storage object.',
          inDepthExplanation: `In traditional file systems, data is located by path (e.g. /home/user/document.txt). If you rename a file, duplicate it into ten folders, or revert changes, the filesystem duplicates data blocks across disk sectors.

In Git's Content-Addressable Storage:
1. When you save a file, Git calculates SHA1(header + content).
2. The resulting 40-character hexadecimal string becomes the unique address of that object.
3. If two different files in two completely different folders have identical content (e.g. empty __init__.py files, or duplicated licenses), Git writes the object to disk exactly once! Both tree objects simply reference the same SHA-1.
4. Fanout Directory Sharding: To prevent Linux file systems from choking when storing 500,000 files in a single folder, Git uses a 2-character prefix directory structure: an object with SHA1 4b825dc642cb... is stored at .git/objects/4b/825dc642cb....`,
          asciiDiagram: `
CONTENT-ADDRESSABLE DEDUPLICATION:
src/utils/license.txt ("MIT License...") ---+
                                             +---> SHA-1: 7a3b4c... ---> .git/objects/7a/3b4c... (Stored ONCE!)
docs/legal/license.txt ("MIT License...") --+`
        },
        {
          title: 'Canonical Git Object Envelope & Zlib Deflate Compression',
          tag: 'Binary Serialization',
          coreConcept: 'Every Git object on disk is prepended with a canonical ASCII header followed by a null byte, compressed using zlib deflate.',
          inDepthExplanation: `The disk format of every Git object follows a strict universal envelope:
[ Object Type ASCII ] + ' ' + [ Payload Size Decimal ASCII ] + '\\0' (Null Byte) + [ Raw Payload Bytes ]

For example, a file containing the 5 bytes "hello":
1. Header: "blob 5\\0"
2. Combined byte sequence: "blob 5\\0hello"
3. SHA-1 Computation: SHA1("blob 5\\0hello") = "b6fc4c620b67d95f953a5c1c1230aaab5db5a1b0"
4. Storage: The combined 12 bytes are compressed with zlib deflate (RFC 1951) and written to .git/objects/b6/fc4c620b67d95f953a5c1c1230aaab5db5a1b0.

The null byte delimiter is non-negotiable: it allows Git's C parser to read the type and length with a simple strtok() or memory scan before reading the exact binary payload without string reallocation.`,
          asciiDiagram: `
CANONICAL GIT OBJECT WIRE FORMAT:
+-------------------------------------------------------------------+
|  "blob"  | ' ' | "14" (Length in ASCII) | '\\0' | Raw File Bytes   |
+-------------------------------------------------------------------+
|<-------- Header (Calculated) ---------->|<-- Null Byte Delimiter -->|
|                                                                   |
+-------------------------------------------------------------------+
  ===> SHA1() ===> 40-char Hex Hash ===> zlib.compress() ===> Disk!`
        },
        {
          title: 'Tree Object Binary Serialization: Hex vs 20 Raw Bytes',
          tag: 'Binary Wire Protocols',
          coreConcept: 'Tree objects do not store human-readable 40-character hex strings; they pack 20 raw binary bytes per entry to minimize repository size.',
          inDepthExplanation: `A tree object represents a directory. It contains an ordered list of entries, each pointing to either a blob (file) or another tree (subdirectory).

Each entry in a tree object has the format:
[ File Mode ASCII ] + ' ' + [ Filename ASCII ] + '\\0' + [ 20 Raw Binary Bytes of SHA-1 ]

Common File Modes:
- 100644: Normal readable file (blob)
- 100755: Executable script / binary (blob)
- 040000: Directory / Subtree (tree)
- 120000: Symbolic link (blob)

Critical Gotcha: Beginners often write the 40-character hexadecimal string (e.g. "4b825dc6...") into the tree file. If you do this, official Git commands (git log, git checkout) will crash with "corrupt tree object". You must use binascii.unhexlify() or bytes.fromhex() to convert the 40 hex chars into exactly 20 raw binary bytes!`,
          asciiDiagram: `
TREE OBJECT BINARY LAYOUT:
+--------------------------------------------------------------------+
| "tree 72\\0" (Envelope Header)                                      |
+--------------------------------------------------------------------+
| "100644 main.c\\0" | [ 20 Bytes Binary SHA-1 of main.c blob ]     |
| "100755 build.sh\\0"| [ 20 Bytes Binary SHA-1 of build.sh blob ]   |
| "040000 docs\\0"    | [ 20 Bytes Binary SHA-1 of docs subtree ]    |
+--------------------------------------------------------------------+`
        },
        {
          title: 'The Commit Merkle DAG & Branch References',
          tag: 'Distributed Systems & Merkle Trees',
          coreConcept: 'Commits form a cryptographic Merkle Directed Acyclic Graph. Branches are not heavy folders, but tiny 41-byte text files pointing to a commit hash.',
          inDepthExplanation: `A Git commit is remarkably simple plain text:
tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904
parent 92a40c1e8d91f284b8d69288fbee490412345678
author Linus Torvalds <torvalds@linux-foundation.org> 1112911993 -0700
committer Linus Torvalds <torvalds@linux-foundation.org> 1112911993 -0700

Add handcrafted git implementation

What is a Branch?
In Subversion or Perforce, creating a branch copied an entire multi-gigabyte repository folder. In Git, creating a branch main simply writes a 41-byte file to .git/refs/heads/main containing the 40-character commit hash and a newline!
What is HEAD?
.git/HEAD is a text file containing "ref: refs/heads/main\\n". It is a symbolic pointer designating which branch is currently active in your working tree. Switching branches (checkout) simply changes the contents of this text file!`,
          asciiDiagram: `
THE COMMIT MERKLE DAG:
[ Commit 3 ] (HEAD -> refs/heads/main)
     | (parent pointer)
     v
[ Commit 2 ]
     | (parent pointer)
     v
[ Commit 1 ] (Initial Commit - No Parent)
     |
     v
[ Root Tree ] ---> [ blobs: main.c, README.md ]`
        }
      ],
      executionRoadmap: [
        {
          phaseNumber: 1,
          phaseTitle: 'Repository Initialization & Compressed Blob Writer',
          summary: 'Scaffold the .git directory hierarchy, implement canonical blob header formatting, and write zlib-compressed objects to disk.',
          architectureDeepDive: 'In this foundational phase, we build the core storage primitive. We create git init, creating .git/objects, .git/refs/heads, and writing "ref: refs/heads/main\\n" to .git/HEAD. Then we implement hash_object(data), prepending "blob <len>\\0", calculating SHA-1, and compressing with zlib.',
          visualWorkflowAscii: `
Git Init & Hash-Object Flow:
.git/
├── HEAD ("ref: refs/heads/main\\n")
├── objects/xx/ (2-char hex directory)
│   └── yyy... (38-char deflated file)
└── refs/heads/`,
          concreteExecutionSteps: [
            'Create my_git.py supporting CLI commands via sys.argv.',
            'Implement cmd_init(): create .git, .git/objects, .git/refs/heads, and write .git/HEAD.',
            'Implement hash_object(data, type="blob", write=True): calculate SHA-1 of f"{type} {len(data)}\\0" + data.',
            'Create 2-char directory: .git/objects/{sha[:2]} and write zlib.compress(full_data).',
            'Verify by hashing an empty file: assert hash equals e69de29bb2d1d6434b8b29ae775ad8c2e48c5391.'
          ],
          verificationCommand: 'python3 my_git.py init && python3 -c "import my_git; print(\'Empty blob:\', my_git.hash_object(b\'\', write=True))" && git fsck',
          expectedOutput: `[INIT] Initialized empty Git repository in .git/
[HASH] Empty blob: e69de29bb2d1d6434b8b29ae775ad8c2e48c5391
[OBJECT] Written to .git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391
notice: HEAD points to an unborn branch (main)
Checking object directories: 100% (256/256), done.
dangling blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391
[PASS] Phase 1 Repo initialization and blob serialization 100% verified by official git!`,
          edgeCasesAndPitfalls: [
            'Missing null byte: forgetting \\0 between header and content creates an invalid object that crashes git fsck.',
            'File permissions: directories must be created with 0755 mode, object files with 0644 mode.'
          ]
        },
        {
          phaseNumber: 2,
          phaseTitle: 'Object Decompression & Cat-File Inspector',
          summary: 'Read compressed objects from .git/objects/, decompress with zlib, unpack the canonical header, and print payload contents (cat-file -p) or types (cat-file -t).',
          architectureDeepDive: 'In this phase, we build the inverse reader. Given a 40-character SHA-1, we locate the file at .git/objects/{sha[:2]}/{sha[2:]}, read all bytes, decompress with zlib.decompress(), split at the first null byte \\0, and extract the object type, size, and raw payload.',
          visualWorkflowAscii: `
Cat-File Pipeline:
SHA-1 Hash -> Locate .git/objects/xx/yyy -> zlib.decompress()
                                                |
                                        Find First '\\0'
                                                |
                        +-----------------------+-----------------------+
                        |                                               |
              Type & Size Header                               Payload Bytes
            ("blob 14", "tree 82")                        ("hello world\\n")`,
          concreteExecutionSteps: [
            'Implement read_object(sha): open .git/objects/{sha[:2]}/{sha[2:]} and decompress.',
            'Locate first null byte index via raw.find(b\'\\0\').',
            'Extract header string: type_str, size_str = raw[:null_idx].decode().split(" ").',
            'Implement cmd_cat_file(mode, sha): support "-p" (print payload) and "-t" (print type).',
            'Test by hashing a string, writing it, and cat-file inspecting it with official git cat-file.'
          ],
          verificationCommand: 'python3 -c "import my_git; h = my_git.hash_object(b\'Hello Git World\\n\', write=True); print(\'Created blob:\', h)" && git cat-file -p $(python3 -c "import my_git; print(my_git.hash_object(b\'Hello Git World\\n\', write=False))")',
          expectedOutput: `[CAT-FILE] Type: blob, Size: 16 bytes
Hello Git World
[PASS] Phase 2 Object reading and decompression validated by official git CLI!`,
          edgeCasesAndPitfalls: [
            'Partial 4-character hashes: official git supports short SHAs; if length < 40, scan the 2-char directory for matching prefixes.',
            'Zlib decompression corruption: raise custom error if zlib.error occurs.'
          ]
        },
        {
          phaseNumber: 3,
          phaseTitle: 'Recursive Filesystem Tree Serializer',
          summary: 'Scan the local working directory, create blob objects for files, pack 20-byte binary SHA-1 hashes into tree objects, and recurse into subdirectories.',
          architectureDeepDive: 'A tree object serializes a directory. We sort entries alphabetically by name (critical for consistent hashing). For each file, we hash the content to get a blob SHA-1. We pack the mode (100644), filename, null byte, and 20 raw binary bytes (bytes.fromhex(sha)). If a subdirectory is encountered, we recurse to create a subtree, packing mode 040000.',
          visualWorkflowAscii: `
Working Directory to Merkle Tree:
project/
├── app.py (blob 100644: sha1_a)   ===> Root Tree:
└── lib/                                 - 100644 app.py (sha1_a)
    └── math.py (blob 100644: sha1_b)    - 040000 lib (Subtree sha1_tree)
                                                |
                                                v Subtree:
                                                - 100644 math.py (sha1_b)`,
          concreteExecutionSteps: [
            'Implement write_tree(dir_path): read entries, ignoring .git.',
            'Sort entries alphabetically by filename (Git standard sorting rule).',
            'For regular files: create blob, format entry: f"100644 {name}\\0".encode() + bytes.fromhex(blob_sha).',
            'For directories: recursive call write_tree(subdir_path), format entry: f"040000 {name}\\0".encode() + bytes.fromhex(tree_sha).',
            'Concatenate all entries, hash as object type "tree", and write to .git/objects/.',
            'Verify with official git ls-tree <tree_sha>.'
          ],
          verificationCommand: 'python3 my_git.py write-tree && git ls-tree HEAD 2>/dev/null || echo "Tree serialized successfully!"',
          expectedOutput: `[TREE] Scanning working directory...
[BLOB] Stored my_git.py (Mode 100644) -> SHA: 9f41b2a...
[BLOB] Stored README.md (Mode 100644) -> SHA: 14c3e80...
[TREE] Created root tree object -> SHA: d8329fc1c5196...
100644 blob 14c3e80...    README.md
100644 blob 9f41b2a...    my_git.py
[PASS] Phase 3 Recursive Merkle tree serialized and verified with 20-byte binary packing!`,
          edgeCasesAndPitfalls: [
            'Writing 40-char hex string instead of 20 raw bytes into tree objects is the #1 bug.',
            'Forgetting to sort entries: Git requires strict byte-order sorting; unsorted trees produce mismatched hashes.'
          ]
        },
        {
          phaseNumber: 4,
          phaseTitle: 'Commit DAG Assembler & Official Git Compatibility',
          summary: 'Assemble commit objects with tree pointer, parent hash, author metadata, and commit messages; update branch refs, and view with git log.',
          architectureDeepDive: 'In this culminating phase, we assemble commit objects. We format tree <sha>, parent <sha> (if branch ref exists), author Name <email> epoch +0000, committer Name <email> epoch +0000, empty line \\n, and message. We hash as type "commit", write to .git/objects/, and update .git/refs/heads/main. We run official git log --graph to prove complete binary compatibility!',
          visualWorkflowAscii: `
Commit DAG Creation:
Working Tree -> write_tree() -> Root Tree SHA
                                      |
                      Format Commit Text Payload:
                      tree <tree_sha>
                      parent <old_commit_sha>
                      author You <you@mail.com> 1700000000 +0000
                      committer You <you@mail.com> 1700000000 +0000
                      \\n
                      Commit message
                                      |
                      hash_object(commit_payload, type="commit")
                                      |
                      Write 40-char SHA to .git/refs/heads/main!`,
          concreteExecutionSteps: [
            'Implement cmd_commit(message): call write_tree(".") to get root tree hash.',
            'Read current commit from .git/refs/heads/main (if it exists) as parent hash.',
            'Construct commit payload text with tree, parent, author, committer, and message.',
            'Hash object with type "commit" and write to .git/objects/.',
            'Write new commit SHA into .git/refs/heads/main.',
            'Run official git log and git status to verify your commit is recognized by Git.'
          ],
          verificationCommand: 'python3 my_git.py commit "Initial commit from handcrafted VCS" && git log -1 --stat',
          expectedOutput: `[COMMIT] Root tree: d8329fc1c5196...
[COMMIT] Author: Antigravity Engineer <dev@baremetal.local>
[COMMIT] Created commit: 3a98f10b271d4... -> refs/heads/main updated.
commit 3a98f10b271d4... (HEAD -> main)
Author: Antigravity Engineer <dev@baremetal.local>
Date:   Sat Nov 22 16:00:00 2026 +0000

    Initial commit from handcrafted VCS

 README.md | 12 ++++++++++++
 my_git.py | 94 +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 2 files changed, 106 insertions(+)
[PASS] Phase 4 Production Verification: Handcrafted Git repository fully recognized by official Git!`,
          edgeCasesAndPitfalls: [
            'Missing empty newline between headers and commit message: Git parser will treat message as unknown header and fail.',
            'Not updating .git/refs/heads/main atomically: in production, write to .git/refs/heads/main.lock and rename() to prevent concurrent corruption.'
          ]
        }
      ],
      dataStructures: [
        {
          name: 'Git Object Format on Disk',
          description: 'Every git object starts with a human-readable type, space, length in decimal, null byte, then raw binary payload.',
          asciiDiagram: `
+-------------------------------------------------------------------+
| "<type> <length>\\0" | <raw binary content payload>               |
+-------------------------------------------------------------------+`
        },
        {
          name: 'Tree Object Binary Entry Layout',
          description: 'Packed binary entry storing octal file mode, filename, null delimiter, and 20 raw bytes of SHA-1 digest.',
          asciiDiagram: `
+-------------------------------------------------------------------+
| Mode ASCII (e.g. "100644") | ' ' | Filename ASCII | '\\0'          |
+-------------------------------------------------------------------+
| 20 Raw Binary Bytes (bytes.fromhex(sha1))                         |
+-------------------------------------------------------------------+`
        },
        {
          name: 'Commit Object Text Specification',
          description: 'Human-readable manifest specifying tree root, parent pointers, author/committer identities, and commit log message.',
          asciiDiagram: `
+-------------------------------------------------------------------+
| tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904\\n                  |
| parent 92a40c1e8d91f284b8d69288fbee490412345678\\n                |
| author Ada Lovelace <ada@engine.org> 1700000000 +0000\\n           |
| committer Ada Lovelace <ada@engine.org> 1700000000 +0000\\n        |
| \\n                                                                |
| Handcrafted Git VCS commit message\\n                               |
+-------------------------------------------------------------------+`
        }
      ],
      keySyscalls: [
        { syscall: 'open', signature: 'int open(const char *path, int flags, mode_t mode);', purpose: 'Creates and reads object files in .git/objects/xx/.' },
        { syscall: 'mkdir', signature: 'int mkdir(const char *pathname, mode_t mode);', purpose: 'Creates 2-character subdirectories in .git/objects/ for hash fanout.' },
        { syscall: 'stat', signature: 'int stat(const char *pathname, struct stat *statbuf);', purpose: 'Inspects file modes (executable 100755 vs regular 100644).' },
        { syscall: 'rename', signature: 'int rename(const char *oldpath, const char *newpath);', purpose: 'Atomically updates branch reference files using lockfiles.' }
      ],
      commonPitfalls: [
        'Writing 40-byte hex strings instead of 20 raw binary bytes into tree objects is the most common bug in custom Git implementations.',
        'Forgetting null byte `\\0`: The header must terminate with a null byte before payload bytes.',
        'Unsorted Tree Entries: Git requires tree entries to be sorted in strict byte-order; unsorted trees produce mismatched hashes.',
        'Missing newline before commit message: Omitting the empty line `\\n` corrupts commit objects.'
      ],
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
