// membuat queue untuk keluar masuknya vertex / node
class PriorityQueue {
  constructor() {
    this.values = [];
  }
  //   menambah queue
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }
  //  menghapus atau mengeluarkan queue
  dequeue() {
    return this.values.shift();
  }
  //   mensorting queue yg lebih pendek
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

//  membuat graph untuk short path djikstra
class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  // function membuat vertex tempat  destinasi
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  //    function membuat edge dan panjang jarak penghubung ke  vertex lain
  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }
  //   Short-Path
  Dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = []; // tempat menembalikan nodes terakhir
    let smallest;
    // membangun initial state
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }
    // menentukan panjang path yg dikunjungi
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      if (smallest === finish) {
        // selesai sampai tujuan mengembalikan nilai terekhir
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          //  mencari tetangga dari node
          let nextNode = this.adjacencyList[smallest][neighbor];
          //menjumlah tetangga node
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          if (candidate < distances[nextNeighbor]) {
            //update jarak terkecil antara node  dan tetangga
            distances[nextNeighbor] = candidate;
            //update previous - mendapatkan jarak antar tetanggaa sebelumnya
            previous[nextNeighbor] = smallest;
            //enqueue hasil queue dengan hasil yg baru
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    return path.concat(smallest).reverse();
  }
}
//  instanisasi  Graph
var graph = new WeightedGraph();
//  menambah vertex
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

//  menambah vertex konektor Edge
graph.addEdge("A", "B", 6);
graph.addEdge("A", "C", 6);
graph.addEdge("B", "E", 4);
graph.addEdge("C", "D", 6);
graph.addEdge("C", "F", 10);
graph.addEdge("D", "E", 5);
graph.addEdge("D", "F", 3);
graph.addEdge("E", "F", 5);
//  menampilkan isi graph
console.log(graph.adjacencyList);

// memanggil dijkstra dan mentukan jarak terdekat
graph.Dijkstra("A", "E");

// ["A", "C", "D", "F", "E"]
